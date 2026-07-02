import { Component, JSX, ParentComponent, Show, splitProps } from "solid-js";

type LinkButtonProps = {
  href?: string;
  disabled?: boolean;
  title?: string;
  "aria-label"?: string;
  class?: string;
  /** Astro LinkButton defaults to accent hover; BackButton disables it. */
  accentHover?: boolean;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LinkButton: ParentComponent<LinkButtonProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "href",
    "disabled",
    "title",
    "aria-label",
    "class",
    "accentHover",
    "children",
  ]);
  const accentHover = () => local.accentHover !== false && !local.disabled;

  const linkClass = () =>
    [
      "group inline-flex items-center gap-1",
      accentHover() ? "hover:text-accent" : "",
      local.class ?? "",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <Show
      when={!local.disabled && local.href}
      fallback={
        <span
          class={linkClass()}
          title={local.title}
          aria-label={local["aria-label"]}
        >
          {local.children}
        </span>
      }
    >
      <a
        href={local.href}
        class={linkClass()}
        title={local.title}
        aria-label={local["aria-label"]}
        {...rest}
      >
        {local.children}
      </a>
    </Show>
  );
};
