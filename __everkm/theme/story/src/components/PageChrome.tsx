import { Component, Show } from "solid-js";
import { shouldShowBreadcrumb } from "../lib/breadcrumb";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";

type PageChromeProps = {
  ctx: PageContext;
  pageKey: string;
  showBack?: boolean;
};

/**
 * Breadcrumb + back button outside #main-content (Astro Paper layout).
 * Spacing: only the first visible row gets mt-8; breadcrumb mb-1, back mb-2.
 */
export const PageChrome: Component<PageChromeProps> = (props) => {
  const hasBreadcrumb = () =>
    shouldShowBreadcrumb(props.ctx, props.pageKey);
  const hasBack = () => !!props.showBack;

  return (
    <div data-vt-swap="page-chrome">
      <Show when={hasBreadcrumb()}>
        <Breadcrumb ctx={props.ctx} pageKey={props.pageKey} />
      </Show>
      <Show when={hasBack()}>
        <BackButton ctx={props.ctx} omitTopMargin={hasBreadcrumb()} />
      </Show>
    </div>
  );
};
