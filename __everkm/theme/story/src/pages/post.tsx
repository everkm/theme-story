import { Component, For, Show } from "solid-js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { getStoryConfig } from "../lib/config";
import { useTranslations } from "../lib/i18n";
import { toTransitionName } from "../lib/toTransitionName";
import { resolvePostCover } from "../lib/postCover";
import { resolvePostDetail } from "../lib/postDetail";
import { resolveStoryMediaUrl } from "../lib/dataSource";
import { POSTS_CONTENT_DIR } from "../lib/postsPath";
import { APP_PROSE } from "../lib/proseClasses";
import { Header } from "../layout/Header";
import { Footer } from "../components/Footer";
import { BackButton } from "../components/BackButton";
import { Tag } from "../components/Tag";
import { PostCopyright } from "../components/PostCopyright";
import { PostNeighbors } from "../components/PostNeighbors";

dayjs.extend(utc);
dayjs.extend(timezone);

type PostPageProps = {
  props: PageContext;
};

function formatMetaTime(ts: number | undefined, timezoneName: string): string {
  if (!ts) return "";
  return dayjs.unix(ts).tz(timezoneName).format("YYYY-MM-DD HH:mm:ss");
}

function publishedTs(post: PostItem): number | null {
  return post.date || post.updated_at || null;
}

function updatedTs(post: PostItem): number | null {
  const published = publishedTs(post);
  if (!post.updated_at || post.updated_at === published) return null;
  return post.updated_at;
}

export const PostPage: Component<PostPageProps> = (p) => {
  const ctx = () => p.props;
  const cfg = () => getStoryConfig(ctx());
  const t = () => useTranslations(ctx().lang);
  const post = () => resolvePostDetail(p.props);
  const showBack = () => cfg().features?.show_back_button !== false;
  const cover = () => (post() ? resolvePostCover(ctx(), post()!) : null);
  const avatar = () =>
    resolveStoryMediaUrl(
      ctx(),
      cfg().site.profile || "/assets/images/avatar-0.jpg",
    );

  const neighbors = () => {
    const item = post();
    if (!item?.id) return null;
    return everkm.post_neighbors(ctx().request_id, {
      id: item.id,
      dir: POSTS_CONTENT_DIR,
      recursive: true,
      draft: false,
      order_by: "date",
      order_direction: "desc",
    });
  };

  const prevPost = () => {
    const prevId = neighbors()?.prev_id;
    return prevId ? everkm.post_meta(ctx().request_id, { id: prevId }) : null;
  };

  const nextPost = () => {
    const nextId = neighbors()?.next_id;
    return nextId ? everkm.post_meta(ctx().request_id, { id: nextId }) : null;
  };

  return (
    <>
      <Header ctx={ctx()} />
      <main id="main-content" data-layout="post" class="app-layout mt-8">
        <Show when={showBack()}>
          <BackButton ctx={ctx()} omitTopMargin />
        </Show>
        <Show when={post()}>
          {(item) => (
            <div class="post-page-container">
              <article class="article-content-container" id="article">
                <Show when={cover()}>
                  <div class="article-hero">
                    <img
                      src={cover()!}
                      alt={item().title || item().slug}
                      class="article-hero__cover"
                      loading="eager"
                    />
                    <div class="article-hero__title-wrap">
                      <h1
                        class="article-hero__title"
                        style={{
                          "view-transition-name": toTransitionName(
                            item().title || item().slug,
                          ),
                        }}
                      >
                        {item().title || item().slug}
                      </h1>
                    </div>
                  </div>
                </Show>

                <Show when={!cover()}>
                  <div class="px-4 pt-6 sm:px-6 md:px-8">
                    <h1
                      class="text-accent text-2xl font-bold sm:text-3xl"
                      style={{
                        "view-transition-name": toTransitionName(
                          item().title || item().slug,
                        ),
                      }}
                    >
                      {item().title || item().slug}
                    </h1>
                  </div>
                </Show>

                <div class="article-header">
                  <div class="article-header__avatar">
                    <img src={avatar()} alt={cfg().site.author ?? ""} />
                  </div>
                  <div>
                    <Show when={!!cfg().site.author}>
                      <div class="article-header__name">{cfg().site.author}</div>
                    </Show>
                    <div class="article-header__meta">
                      <Show when={publishedTs(item())}>
                        {(published) => (
                          <span class="article-header__meta-item">
                            {t().post.publishedAt}:{" "}
                            {formatMetaTime(
                              published(),
                              cfg().site.timezone ?? "UTC",
                            )}
                          </span>
                        )}
                      </Show>
                      <Show when={updatedTs(item())}>
                        {(updated) => (
                          <span class="article-header__meta-item">
                            {t().post.updatedAt}:{" "}
                            {formatMetaTime(
                              updated(),
                              cfg().site.timezone ?? "UTC",
                            )}
                          </span>
                        )}
                      </Show>
                    </div>
                  </div>
                </div>

                <Show when={(item().tags?.length ?? 0) > 0}>
                  <div class="flex flex-wrap gap-2 px-4 pb-2 sm:px-6 md:px-8">
                    <span class="text-muted-foreground italic">
                      {t().post.tagLabel}:
                    </span>
                    <ul class="flex flex-wrap gap-2">
                      <For each={item().tags ?? []}>
                        {(tag) => <Tag ctx={ctx()} tag={tag} />}
                      </For>
                    </ul>
                  </div>
                </Show>

                <div
                  class={`article-content ${APP_PROSE}`}
                  innerHTML={item().content_html ?? ""}
                />

                <PostCopyright ctx={ctx()} post={item()} />
                <PostNeighbors
                  ctx={ctx()}
                  prevPost={prevPost()}
                  nextPost={nextPost()}
                />
              </article>
            </div>
          )}
        </Show>
      </main>
      <Footer ctx={ctx()} config={cfg()} />
    </>
  );
};
