import { Component } from "solid-js";
import { useTranslations } from "../lib/i18n";
import { pageUrl } from "../lib/url";
import { LinkButton } from "./LinkButton";
import IconChevronLeft from "../assets/icons/IconChevronLeft.svg";

function chevronMarkup(): string {
  if (IconChevronLeft.includes('class="')) {
    return IconChevronLeft.replace(
      /class="([^"]*)"/,
      'class="$1 inline-block size-6 rtl:rotate-180"',
    );
  }
  return IconChevronLeft.replace(
    "<svg",
    '<svg class="inline-block size-6 rtl:rotate-180"',
  );
}

type BackButtonProps = {
  ctx: PageContext;
  /** When breadcrumb is above, skip mt-8 (Astro never stacks both; we align spacing). */
  omitTopMargin?: boolean;
};

export const BackButton: Component<BackButtonProps> = (props) => {
  const t = () => useTranslations(props.ctx.lang);
  const linkClass = () =>
    [
      "focus-outline hover:text-foreground/75 -ms-2 mb-2",
      props.omitTopMargin ? "" : "mt-8",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <div class="app-layout flex items-center justify-start">
      <LinkButton
        id="back-button"
        accentHover={false}
        href={pageUrl(props.ctx.request_id, "/index.html")}
        class={linkClass()}
      >
        <span innerHTML={chevronMarkup()} aria-hidden="true" />
        <span>{t().post.goBack}</span>
      </LinkButton>
    </div>
  );
};
