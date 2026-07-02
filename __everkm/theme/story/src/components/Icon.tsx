import { Component, JSX, splitProps } from "solid-js";

/** Render raw SVG markup from esbuild text loader. */
export const Icon: Component<
  {
    svg: string;
    class?: string;
    id?: string;
  } & JSX.HTMLAttributes<HTMLSpanElement>
> = (props) => {
  const [local, rest] = splitProps(props, ["svg", "class", "id"]);

  const withAttrs = () => {
    let svg = local.svg;
    if (local.id) {
      svg = svg.replace("<svg", `<svg id="${local.id}"`);
    }
    const cls = local.class ?? "";
    if (cls) {
      if (svg.includes('class="')) {
        svg = svg.replace(/class="([^"]*)"/, `class="$1 ${cls}"`);
      } else {
        svg = svg.replace("<svg", `<svg class="${cls}"`);
      }
    }
    return svg;
  };

  return (
    <span innerHTML={withAttrs()} aria-hidden="true" {...rest} />
  ) as JSX.Element;
};
