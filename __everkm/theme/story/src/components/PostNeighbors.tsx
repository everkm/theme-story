import { Component, Show } from "solid-js";
import { useTranslations } from "../lib/i18n";
import { pageUrl } from "../lib/url";

type PostNeighborsProps = {
  ctx: PageContext;
  prevPost: PostItem | null;
  nextPost: PostItem | null;
};

export const PostNeighbors: Component<PostNeighborsProps> = (props) => {
  const t = () => useTranslations(props.ctx.lang);

  return (
    <Show when={props.prevPost || props.nextPost}>
      <nav class="article-nav" aria-label={t().post.neighborNav}>
        <Show when={props.prevPost}>
          {(prev) => (
            <div class="article-nav__item">
              <a
                class="article-nav__link"
                href={pageUrl(props.ctx.request_id, prev().url_path)}
              >
                <span class="article-nav__arrow" aria-hidden="true">
                  ←
                </span>
                <span class="min-w-0">
                  <span class="article-nav__title">{prev().title}</span>
                  <span class="article-nav__label">{t().post.previousPost}</span>
                </span>
              </a>
            </div>
          )}
        </Show>
        <Show when={props.nextPost}>
          {(next) => (
            <div class="article-nav__item article-nav__item--next">
              <a
                class="article-nav__link article-nav__link--next"
                href={pageUrl(props.ctx.request_id, next().url_path)}
              >
                <span class="article-nav__arrow" aria-hidden="true">
                  →
                </span>
                <span class="min-w-0">
                  <span class="article-nav__title">{next().title}</span>
                  <span class="article-nav__label">{t().post.nextPost}</span>
                </span>
              </a>
            </div>
          )}
        </Show>
      </nav>
    </Show>
  );
};
