const PLACEHOLDER_DEFAULT_WIDTH = 300;
const PLACEHOLDER_DEFAULT_HEIGHT = 180;
const PLACEHOLDER_FONT_RATIO = 0.16;

export interface ImagePlaceholderOptions {
  width?: number;
  height?: number;
  text?: string;
  fontFamily?: string;
  fontWeight?: string;
  fontSize?: number;
  dy?: number;
  bgColor?: string;
  textColor?: string;
  charset?: string;
}

export function imagePlaceholderSvg(
  options: ImagePlaceholderOptions = {},
): string {
  const width = options.width || PLACEHOLDER_DEFAULT_WIDTH;
  const height = options.height || PLACEHOLDER_DEFAULT_HEIGHT;
  const text = options.text || `${width}×${height}`;
  const fontFamily = options.fontFamily || "sans-serif";
  const fontWeight = options.fontWeight || "bold";
  const fontSize =
    options.fontSize ||
    Math.floor(Math.min(width, height) * PLACEHOLDER_FONT_RATIO);
  const bgColor = options.bgColor || "#ddd";
  const textColor = options.textColor || "rgba(0,0,0,0.3)";
  const charset = options.charset || "UTF-8";

  const str = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <rect fill="${bgColor}" width="${width}" height="${height}"/>
        <text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}" x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">${text}</text>
      </svg>`;

  const cleaned = str
    .replace(/[\t\n\r]/gim, "")
    .replace(/\s\s+/g, " ")
    .replace(/'/gim, "\\i");

  const encoded = encodeURIComponent(cleaned)
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29");
  return `data:image/svg+xml;charset=${charset},${encoded}`;
}

export const IMAGE_PLACEHOLDER_DEFAULT_WIDTH = PLACEHOLDER_DEFAULT_WIDTH;
export const IMAGE_PLACEHOLDER_DEFAULT_HEIGHT = PLACEHOLDER_DEFAULT_HEIGHT;
