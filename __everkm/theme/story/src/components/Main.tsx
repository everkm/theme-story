import { Component, ParentComponent, Show, splitProps } from "solid-js";
import { shouldShowBreadcrumb } from "../lib/breadcrumb";
import { getStoryConfig } from "../lib/config";
import { pageUrl } from "../lib/url";

type MainProps = {
  pageTitle: string;
  pageDesc?: string;
  layout?: string;
  ctx?: PageContext;
  pageKey?: string;
  /** Hide built-in page title block (archives uses container title only). */
  hidePageHeader?: boolean;
  /** Extra classes on `<main>` (Astro about uses `app-prose` on Main). */
  class?: string;
};

export const Main: ParentComponent<MainProps> = (props) => {
  const [local] = splitProps(props, [
    "pageTitle",
    "pageDesc",
    "layout",
    "ctx",
    "pageKey",
    "hidePageHeader",
    "class",
    "children",
  ]);

  const hasBreadcrumb = () =>
    local.ctx && local.pageKey
      ? shouldShowBreadcrumb(local.ctx, local.pageKey)
      : false;

  const backUrl = () => {
    if (!local.ctx) return undefined;
    const cfg = getStoryConfig(local.ctx);
    if (cfg.features?.show_back_button === false) return undefined;
    return pageUrl(local.ctx.request_id, local.ctx.page_path);
  };

  const mainClass = () =>
    [
      "app-layout pb-4",
      hasBreadcrumb() ? "" : "mt-8",
      local.class ?? "",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <main
      id="main-content"
      data-layout={local.layout ?? "page"}
      data-backurl={backUrl()}
      class={mainClass()}
    >
      <Show when={!local.hidePageHeader}>
        <h1 class="text-2xl font-semibold sm:text-3xl">{local.pageTitle}</h1>
        <Show when={local.pageDesc}>
          <p class="text-muted-foreground mt-2 mb-6 italic">{local.pageDesc}</p>
        </Show>
      </Show>
      {local.children}
    </main>
  );
};
