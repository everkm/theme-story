import { Component, For, Show } from "solid-js";
import { getStoryConfig } from "../lib/config";
import {
  loadDataSourceDoc,
  parseMasonryItems,
  resolveStoryMediaUrl,
} from "../lib/dataSource";
import { useTranslations } from "../lib/i18n";
import { pageUrl } from "../lib/url";
import { Header } from "../layout/Header";
import { Footer } from "../components/Footer";
import { PageChrome } from "../components/PageChrome";
import { Main } from "../components/Main";

type MasonryPageProps = {
  props: PageContext;
};

export const MasonryPage: Component<MasonryPageProps> = (p) => {
  const ctx = () => p.props;
  const cfg = () => getStoryConfig(ctx());
  const t = () => useTranslations(ctx().lang);
  const doc = () => loadDataSourceDoc(ctx(), cfg().masonry, "/_masonry.md");
  const items = () => parseMasonryItems(doc()?.meta);
  const originPath = () => doc()?.path ?? "/_masonry.md";
  const pageTitle = () => doc()?.title ?? t().pages.masonryTitle;

  return (
    <>
      <Header ctx={ctx()} />
      <PageChrome ctx={ctx()} pageKey="album" />
      <Main
        ctx={ctx()}
        pageKey="album"
        pageTitle={pageTitle()}
        layout="album"
        hidePageHeader
      >
        <div class="page-template-container">
          <h1 class="page-title-header">{pageTitle()}</h1>
          <Show
            when={items().length > 0}
            fallback={
              <p class="text-muted-foreground italic">{t().pages.masonryEmpty}</p>
            }
          >
            <div class="loading-placeholder">
              <div class="flex-grid generic-card">
                <div class="card loading" />
                <div class="card loading" />
                <div class="card loading" />
              </div>
            </div>
            <div
              id="masonry-container"
              data-vendor-script={pageUrl(
                ctx().request_id,
                "/assets/vendor/minimasonry.min.js",
              )}
            >
              <For each={items()}>
                {(item) => {
                  const imageUrl = resolveStoryMediaUrl(
                    ctx(),
                    item.image,
                    originPath(),
                  );
                  return (
                    <div class="masonry-item">
                      <a
                        class="story-album-link"
                        href={imageUrl}
                        aria-label={item.title ?? item.description ?? imageUrl}
                      >
                        <div class="image-container">
                          <img
                            src={imageUrl}
                            alt={item.title ?? ""}
                          />
                          <Show when={!!item.title}>
                            <div class="image-title">{item.title}</div>
                          </Show>
                          <Show when={!!item.description}>
                            <div class="image-description">
                              {item.description}
                            </div>
                          </Show>
                          <Show when={!!item.title || !!item.description}>
                            <span class="hidden-caption-content">
                              <Show when={!!item.title}>
                                <strong>{item.title}</strong>
                              </Show>
                              <Show when={!!item.description}>
                                {item.description}
                              </Show>
                            </span>
                          </Show>
                        </div>
                      </a>
                    </div>
                  );
                }}
              </For>
            </div>
          </Show>
          <Show when={!!doc()?.content_html}>
            <div
              class="page-template-content app-prose mt-8"
              innerHTML={doc()!.content_html!}
            />
          </Show>
        </div>
      </Main>
      <Footer ctx={ctx()} config={cfg()} />
    </>
  );
};
