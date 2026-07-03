import { installWebGLParticles } from "./particlesWebGL";

export function installParticles(): void {
  if (document.body.dataset.particles !== "true") return;

  const container = document.getElementById("story-particles-webgl");
  if (!container) return;

  try {
    if (!installWebGLParticles(container)) {
      container.remove();
    }
  } catch (error) {
    container.remove();
    console.warn("[story] particles init failed:", error);
  }
}
