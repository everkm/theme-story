import { Component, For, Show } from "solid-js";
import { useTranslations } from "../lib/i18n";
import {
  buildPageNavItems,
  paginationHref,
} from "../lib/pagination";
import { NavigateNextIcon, NavigatePrevIcon } from "../layout/icons";

type PaginationProps = {
  ctx: PageContext;
  pageNo: number;
  pageCount: number;
  basePath: string;
  /** Wrap with home-paginator padding when used inside home content. */
  layout?: "home" | "default";
};

/** redefine .paginator chip — padding 8px 16px, rounded 9px */
const paginatorChipClass =
  "relative mx-[0.3rem] inline-flex cursor-pointer items-center justify-center rounded-[9px] px-4 py-2 whitespace-nowrap bg-background text-[var(--story-text-default)] shadow-[var(--story-box-shadow)] transition-[color,background,box-shadow,transform] duration-200 hover:bg-accent hover:text-accent-foreground hover:shadow-[var(--story-box-shadow-hover)] active:scale-95 active:duration-100";

const paginatorCurrentClass =
  "page-number current relative mx-[0.3rem] inline-flex items-center justify-center rounded-[9px] px-4 py-2 whitespace-nowrap bg-accent text-accent-foreground shadow-[var(--story-box-shadow)]";

const paginatorIconClass = "block size-[0.9em] shrink-0";

export const Pagination: Component<PaginationProps> = (props) => {
  const t = () => useTranslations(props.ctx.lang);
  const prevHref = () =>
    props.pageNo > 1
      ? paginationHref(props.basePath, props.pageNo - 1)
      : undefined;
  const nextHref = () =>
    props.pageNo < props.pageCount
      ? paginationHref(props.basePath, props.pageNo + 1)
      : undefined;
  const pageItems = () => buildPageNavItems(props.pageNo, props.pageCount);

  const paginator = () => (
    <div
      class="paginator mt-[30px] flex justify-center text-base"
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <Show when={prevHref()}>
        {(href) => (
          <a
            class={`extend prev ${paginatorChipClass} max-sm:hidden`}
            rel="prev"
            href={href()}
            aria-label={t().a11y.goToPreviousPage}
          >
            <NavigatePrevIcon class={paginatorIconClass} />
          </a>
        )}
      </Show>

      <For each={pageItems()}>
        {(item) =>
          typeof item === "number" ? (
            item === props.pageNo ? (
              <span class={paginatorCurrentClass}>{item}</span>
            ) : (
              <a
                class={`page-number ${paginatorChipClass}`}
                href={paginationHref(props.basePath, item)}
              >
                {item}
              </a>
            )
          ) : (
            <span class="space mx-[0.3rem] inline-flex items-center px-2.5 py-2 max-sm:px-0.5">
              &hellip;
            </span>
          )
        }
      </For>

      <Show when={nextHref()}>
        {(href) => (
          <a
            class={`extend next ${paginatorChipClass} max-sm:hidden`}
            rel="next"
            href={href()}
            aria-label={t().a11y.goToNextPage}
          >
            <NavigateNextIcon class={paginatorIconClass} />
          </a>
        )}
      </Show>
    </div>
  );

  return (
    <div data-vt-swap="pagination">
      <Show when={props.pageCount > 1}>
        <Show
          when={props.layout === "home"}
          fallback={paginator()}
        >
          <div class="home-paginator px-7 py-5">{paginator()}</div>
        </Show>
      </Show>
    </div>
  );
};
