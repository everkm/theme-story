import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Component, For, Show } from "solid-js";
import { getStoryConfig } from "../lib/config";
import { useTranslations } from "../lib/i18n";
import { resolvePostCover } from "../lib/postCover";
import { pageUrl } from "../lib/url";
import { toTransitionName } from "../lib/toTransitionName";

dayjs.extend(utc);
dayjs.extend(timezone);

type HomeArticleCardProps = {
  ctx: PageContext;
  post: PostItem;
};

export const HomeArticleCard: Component<HomeArticleCardProps> = (props) => {
  const t = () => useTranslations(props.ctx.lang);
  const href = () => pageUrl(props.ctx.request_id, props.post.url_path);
  const cover = () => resolvePostCover(props.ctx, props.post);
  const cfg = () => getStoryConfig(props.ctx);
  const dateLabel = () => {
    const ts = props.post.date ?? 0;
    if (!ts) return "";
    return dayjs
      .unix(ts)
      .tz(cfg().site.timezone ?? "UTC")
      .format("YYYY-MM-DD");
  };
  const tags = () => props.post.tags?.filter(Boolean) ?? [];

  return (
    <li class="home-article-item">
      <Show when={cover()}>
        <div class="home-article-thumbnail">
          <a href={href()} tabindex="-1" aria-hidden="true">
            <img
              src={cover()!}
              alt=""
              loading="lazy"
              class="dark:brightness-75"
            />
          </a>
        </div>
      </Show>
      <div class="home-article-body">
        <h3 class="home-article-title">
          <a
            href={href()}
            style={{ "view-transition-name": toTransitionName(props.post.title) }}
          >
            {props.post.title}
          </a>
        </h3>
        <Show when={!!props.post.summary}>
          <div class="home-article-content">{props.post.summary}</div>
        </Show>
        <div class="home-article-meta-info-container">
          <div class="home-article-meta-info">
            <Show when={!!dateLabel()}>
              <span class="home-article-date">
                <time datetime={dateLabel()}>{dateLabel()}</time>
              </span>
            </Show>
            <Show when={tags().length > 0}>
              <span class="home-article-tag">
                <For each={tags()}>
                  {(tag) => (
                    <a
                      href={pageUrl(
                        props.ctx.request_id,
                        `/tags/${encodeURIComponent(tag)}/index.html`,
                      )}
                    >
                      {tag}
                    </a>
                  )}
                </For>
              </span>
            </Show>
          </div>
          <a class="home-article-read-more" href={href()}>
            {t().home.readMore}
            <span aria-hidden="true"> →</span>
          </a>
        </div>
      </div>
    </li>
  );
};
