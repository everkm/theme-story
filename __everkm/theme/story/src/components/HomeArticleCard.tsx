import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Component, For, Show } from "solid-js";
import IconCalendars from "../assets/icons/IconCalendars.svg";
import IconTags from "../assets/icons/IconTags.svg";
import { Icon } from "./Icon";
import { getStoryConfig } from "../lib/config";
import { useTranslations } from "../lib/i18n";
import { resolvePostCover } from "../lib/postCover";
import { postTimestampSeconds } from "../lib/postDate";
import { pageUrl } from "../lib/url";
import { toTransitionName } from "../lib/toTransitionName";
import { ChevronRightIcon } from "../layout/icons";

dayjs.extend(utc);
dayjs.extend(timezone);

type HomeArticleCardProps = {
  ctx: PageContext;
  post: PostItem;
};

const metaIconClass = "inline-block size-[0.92em] shrink-0 align-[-0.125em]";

export const HomeArticleCard: Component<HomeArticleCardProps> = (props) => {
  const t = () => useTranslations(props.ctx.lang);
  const href = () => pageUrl(props.ctx.request_id, props.post.url_path);
  const cover = () => resolvePostCover(props.ctx, props.post);
  const cfg = () => getStoryConfig(props.ctx);
  const dateLabel = () => {
    const ts = postTimestampSeconds(props.post);
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
        <div class="home-article-meta-info-container flex items-center justify-between text-[0.92rem] tracking-[0.5px] text-[var(--story-text-muted)]">
          <div class="home-article-meta-info min-w-0">
            <Show when={!!dateLabel()}>
              <span class="mr-2.5 inline-flex items-center gap-1 last:mr-0">
                <Icon svg={IconCalendars} class={metaIconClass} />
                <span class="home-article-date">
                  <time datetime={dateLabel()}>{dateLabel()}</time>
                </span>
              </span>
            </Show>
            <Show when={tags().length > 0}>
              <span class="home-article-tag mr-2.5 inline-flex items-center gap-1 last:mr-0 max-md:hidden">
                <Icon svg={IconTags} class={metaIconClass} />
                <ul class="m-0 inline list-none p-0">
                  <For each={tags()}>
                    {(tag, index) => (
                      <li class="inline">
                        {index() > 0 ? "| " : ""}
                        <a
                          class="text-[var(--story-text-muted)] no-underline hover:text-accent"
                          href={pageUrl(
                            props.ctx.request_id,
                            `/tags/${encodeURIComponent(tag)}/index.html`,
                          )}
                        >
                          {tag}
                        </a>{" "}
                      </li>
                    )}
                  </For>
                </ul>
              </span>
            </Show>
          </div>
          <a
            class="shrink-0 whitespace-nowrap text-[var(--story-text-muted)] no-underline hover:text-accent"
            href={href()}
          >
            {t().home.readMore}
            <span class="sr-only">{props.post.title}</span>
            <ChevronRightIcon class="mx-0.5 inline-block size-[0.85em] align-[-0.1em]" />
          </a>
        </div>
      </div>
    </li>
  );
};
