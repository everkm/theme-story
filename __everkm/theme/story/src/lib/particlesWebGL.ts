const PARTICLE_COUNT = 20;
const FLOATS_PER_PARTICLE = 8;
/** Logical-pixel canvas; Retina 2× fill is wasted for tiny flakes. */
const MAX_DPR = 1;
/** ~20fps is enough for slow snow; CSS runs on compositor with zero JS. */
const TARGET_FPS = 20;
const FRAME_MS = 1000 / TARGET_FPS;
const PARTICLE_COLOR: [number, number, number] = [1, 1, 1];

const VERT_SRC = `
precision highp float;
attribute float a_x;
attribute float a_y;
attribute float a_speed;
attribute float a_sway;
attribute float a_freq;
attribute float a_phase;
attribute float a_size;
attribute float a_alpha;
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_dpr;
varying float v_alpha;

void main() {
  float fall = mod(a_y + u_time * a_speed, 1.12) - 0.06;
  float px = a_x * u_resolution.x + sin(u_time * a_freq + a_phase) * a_sway;
  float py = fall * u_resolution.y;
  gl_Position = vec4(
    (px / u_resolution.x) * 2.0 - 1.0,
    1.0 - (py / u_resolution.y) * 2.0,
    0.0,
    1.0
  );
  gl_PointSize = max(a_size * u_dpr, 1.0);
  v_alpha = a_alpha;
}
`;

const FRAG_SRC = `
precision highp float;
uniform vec3 u_color;
varying float v_alpha;

void main() {
  vec2 c = gl_PointCoord - vec2(0.5);
  float d = length(c);
  if (d > 0.5) discard;
  // Solid white core; only the outer rim softens slightly.
  float alpha = v_alpha * (1.0 - smoothstep(0.32, 0.5, d) * 0.25);
  gl_FragColor = vec4(u_color, alpha);
}
`;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function webglContextOptions(): WebGLContextAttributes {
  return {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    powerPreference: "low-power",
  };
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("[story] WebGL shader compile failed:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn("[story] WebGL program link failed:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function createParticleData(count: number): Float32Array {
  const data = new Float32Array(count * FLOATS_PER_PARTICLE);
  for (let i = 0; i < count; i++) {
    const o = i * FLOATS_PER_PARTICLE;
    data[o] = Math.random();
    data[o + 1] = Math.random();
    // ~18–35s per screen fall
    data[o + 2] = 0.028 + Math.random() * 0.028;
    // horizontal sway in px, aligned with CSS snow (~12–40px)
    data[o + 3] = 10 + Math.random() * 30;
    // slow sway: ~8–18s per half-cycle
    data[o + 4] = 0.35 + Math.random() * 0.45;
    data[o + 5] = Math.random() * Math.PI * 2;
    data[o + 6] = 3.5 + Math.random() * 3;
    data[o + 7] = 0.85 + Math.random() * 0.15;
  }
  return data;
}

type AttribLocs = {
  x: number;
  y: number;
  speed: number;
  sway: number;
  freq: number;
  phase: number;
  size: number;
  alpha: number;
};

class SnowRenderer {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private attribs: AttribLocs;
  private uTime: WebGLUniformLocation | null;
  private uResolution: WebGLUniformLocation | null;
  private uDpr: WebGLUniformLocation | null;
  private uColor: WebGLUniformLocation | null;
  private buffer: WebGLBuffer;
  private timerId = 0;
  private startMs = 0;
  private paused = false;
  private dpr = 1;
  private onVisibilityChange = () => {
    this.setPaused(document.hidden);
  };
  private resizeObserver: ResizeObserver | null = null;

  private setPaused(paused: boolean): void {
    if (this.paused === paused) return;
    this.paused = paused;
    if (this.paused) {
      clearTimeout(this.timerId);
      this.timerId = 0;
      return;
    }
    this.scheduleLoop();
  }

  private constructor(
    container: HTMLElement,
    canvas: HTMLCanvasElement,
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    attribs: AttribLocs,
    buffer: WebGLBuffer,
  ) {
    this.container = container;
    this.canvas = canvas;
    this.gl = gl;
    this.program = program;
    this.attribs = attribs;
    this.buffer = buffer;
    this.uTime = gl.getUniformLocation(program, "u_time");
    this.uResolution = gl.getUniformLocation(program, "u_resolution");
    this.uDpr = gl.getUniformLocation(program, "u_dpr");
    this.uColor = gl.getUniformLocation(program, "u_color");
  }

  static create(container: HTMLElement): SnowRenderer | null {
    const canvas = document.createElement("canvas");
    canvas.className = "story-particles__canvas";
    canvas.setAttribute("aria-hidden", "true");
    container.appendChild(canvas);

    const gl =
      (canvas.getContext("webgl2", webglContextOptions()) as
        | WebGLRenderingContext
        | null) ??
      canvas.getContext("webgl", webglContextOptions());
    if (!gl) return null;

    const program = createProgram(gl);
    if (!program) return null;

    const attribs: AttribLocs = {
      x: gl.getAttribLocation(program, "a_x"),
      y: gl.getAttribLocation(program, "a_y"),
      speed: gl.getAttribLocation(program, "a_speed"),
      sway: gl.getAttribLocation(program, "a_sway"),
      freq: gl.getAttribLocation(program, "a_freq"),
      phase: gl.getAttribLocation(program, "a_phase"),
      size: gl.getAttribLocation(program, "a_size"),
      alpha: gl.getAttribLocation(program, "a_alpha"),
    };

    const buffer = gl.createBuffer();
    if (!buffer) return null;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, createParticleData(PARTICLE_COUNT), gl.STATIC_DRAW);

    const stride = FLOATS_PER_PARTICLE * 4;
    const bindAttrib = (loc: number, offset: number) => {
      if (loc < 0) return;
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 1, gl.FLOAT, false, stride, offset);
    };
    bindAttrib(attribs.x, 0);
    bindAttrib(attribs.y, 4);
    bindAttrib(attribs.speed, 8);
    bindAttrib(attribs.sway, 12);
    bindAttrib(attribs.freq, 16);
    bindAttrib(attribs.phase, 20);
    bindAttrib(attribs.size, 24);
    bindAttrib(attribs.alpha, 28);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const renderer = new SnowRenderer(container, canvas, gl, program, attribs, buffer);
    renderer.resize();
    renderer.startMs = performance.now();
    gl.useProgram(program);
    gl.uniform3f(renderer.uColor, ...PARTICLE_COLOR);
    renderer.bindEvents();
    renderer.scheduleLoop();
    return renderer;
  }

  private bindEvents(): void {
    document.addEventListener("visibilitychange", this.onVisibilityChange);
    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(this.container);
    } else {
      window.addEventListener("resize", this.resize);
    }
  }

  private resize = (): void => {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (w <= 0 || h <= 0) return;

    this.dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    this.canvas.width = Math.max(1, Math.floor(w * this.dpr));
    this.canvas.height = Math.max(1, Math.floor(h * this.dpr));
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  };

  private scheduleLoop = (): void => {
    clearTimeout(this.timerId);
    this.timerId = window.setTimeout(this.loop, FRAME_MS);
  };

  private loop = (): void => {
    if (this.paused) return;
    const now = performance.now();
    this.draw((now - this.startMs) / 1000);
    this.scheduleLoop();
  };

  private draw(time: number): void {
    const { gl, program } = this;

    gl.useProgram(program);
    gl.uniform1f(this.uTime, time);
    gl.uniform2f(this.uResolution, this.canvas.width, this.canvas.height);
    gl.uniform1f(this.uDpr, this.dpr);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, PARTICLE_COUNT);
  }

  destroy(): void {
    clearTimeout(this.timerId);
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
    this.resizeObserver?.disconnect();
    window.removeEventListener("resize", this.resize);

    const { gl } = this;
    gl.deleteBuffer(this.buffer);
    gl.deleteProgram(this.program);
    this.canvas.remove();
  }
}

let activeRenderer: SnowRenderer | null = null;

export function installWebGLParticles(container: HTMLElement): boolean {
  if (container.dataset.initialized === "1") return true;
  if (prefersReducedMotion()) return false;

  try {
    const renderer = SnowRenderer.create(container);
    if (!renderer) return false;
    activeRenderer = renderer;
    container.dataset.initialized = "1";
    return true;
  } catch (error) {
    console.warn("[story] WebGL particles init failed:", error);
    return false;
  }
}

export function teardownWebGLParticles(): void {
  activeRenderer?.destroy();
  activeRenderer = null;
}
