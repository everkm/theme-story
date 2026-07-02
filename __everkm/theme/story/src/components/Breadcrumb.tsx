import { Component, For, Show } from "solid-js";
import { buildBreadcrumbSegments, shouldShowBreadcrumb } from "../lib/breadcrumb";
import { useTranslations } from "../lib/i18n";
import { pageUrl } from "../lib/url";

type BreadcrumbProps = {
  ctx: PageContext;
  pageKey?: string;
};

export const Breadcrumb: Component<BreadcrumbProps> = (props) => {
  const t = () => useTranslations(props.ctx.lang);
  const pageKey = () => props.pageKey ?? "";
  const show = () => shouldShowBreadcrumb(props.ctx, pageKey());
  const segments = () => buildBreadcrumbSegments(props.ctx, t(), pageKey());

  return (
    <Show when={show()}>
      <nav class="app-layout mt-8 mb-4" aria-label="breadcrumb">
          <ul class="font-light flex flex-wrap items-center gap-x-1 [&>li:not(:last-child)>a]:hover:opacity-100">
            <li class="inline-flex items-center gap-x-1">
              <a
                href={pageUrl(props.ctx.request_id, "/index.html")}
                class="opacity-80"
              >
                {t().nav.home}
              </a>
              <span aria-hidden="true" class="opacity-80">
                &raquo;
              </span>
            </li>
            <For each={segments()}>
              {(item) => (
                <li class="inline-flex items-center gap-x-1">
                  <Show
                    when={item.href}
                    fallback={
                      <span
                        class={`capitalize opacity-75 ${item.lowercase ? "lowercase" : ""}`}
                        aria-current="page"
                      >
                        {item.label}
                      </span>
                    }
                  >
                    <a href={item.href} class="capitalize opacity-70">
                      {item.label}
                    </a>
                    <span aria-hidden="true" class="opacity-70">
                      &raquo;
                    </span>
                  </Show>
                </li>
              )}
            </For>
          </ul>
        </nav>
      </Show>
  );
};
