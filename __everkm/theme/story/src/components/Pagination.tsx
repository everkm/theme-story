import { Component, Show } from "solid-js";
import { useTranslations } from "../lib/i18n";
import { paginationHref } from "../lib/pagination";
import { LinkButton } from "./LinkButton";
import { Icon } from "./Icon";
import IconArrowLeft from "../assets/icons/IconArrowLeft.svg";
import IconArrowRight from "../assets/icons/IconArrowRight.svg";

type PaginationProps = {
  ctx: PageContext;
  pageNo: number;
  pageCount: number;
  basePath: string;
};

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

  return (
    <div data-vt-swap="pagination">
      <Show when={props.pageCount > 1}>
        <nav
          class="mt-auto mb-8 flex justify-center gap-4"
          role="navigation"
          aria-label="Pagination Navigation"
        >
        <LinkButton
          href={prevHref()}
          disabled={!prevHref()}
          class={`select-none ${!prevHref() ? "opacity-50" : ""}`}
          aria-label={t().a11y.goToPreviousPage}
        >
          <Icon svg={IconArrowLeft} class="inline-block rtl:rotate-180" />
          {t().pagination.prev}
        </LinkButton>
        {props.pageNo} / {props.pageCount}
        <LinkButton
          href={nextHref()}
          disabled={!nextHref()}
          class={`select-none ${!nextHref() ? "opacity-50" : ""}`}
          aria-label={t().a11y.goToNextPage}
        >
          {t().pagination.next}
          <Icon svg={IconArrowRight} class="inline-block rtl:rotate-180" />
        </LinkButton>
      </nav>
      </Show>
    </div>
  );
};
