import { Component, For, Show } from "solid-js";
import { queryAlbumImages } from "../lib/albumQuery";
import {
  IMAGE_PLACEHOLDER_DEFAULT_HEIGHT,
  IMAGE_PLACEHOLDER_DEFAULT_WIDTH,
  imagePlaceholderSvg,
} from "../lib/imagePlaceholder";
import { useTranslations } from "../lib/i18n";
import { pageUrl } from "../lib/url";
import { Header } from "../layout/Header";
import { Footer } from "../components/Footer";
import { PageChrome } from "../components/PageChrome";
import { Main } from "../components/Main";
import { getStoryConfig } from "../lib/config";

type AlbumPageProps = {
  props: PageContext;
};

export const AlbumPage: Component<AlbumPageProps> = (p) => {
  const ctx = () => p.props;
  const cfg = () => getStoryConfig(ctx());
  const t = () => useTranslations(ctx().lang);
  const items = () => queryAlbumImages(ctx().request_id);
  const pageTitle = () => t().pages.albumTitle;

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
              <p class="text-muted-foreground italic">{t().pages.albumEmpty}</p>
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
              id="album-container"
              data-vendor-script={pageUrl(
                ctx().request_id,
                "/assets/vendor/minimasonry.min.js",
              )}
            >
              <For each={items()}>
                {(item) => {
                  const width = () =>
                    item.width ?? IMAGE_PLACEHOLDER_DEFAULT_WIDTH;
                  const height = () =>
                    item.height ?? IMAGE_PLACEHOLDER_DEFAULT_HEIGHT;
                  return (
                    <div class="album-item">
                      <a
                        class="story-album-link"
                        href={item.image}
                        data-pswp-width={String(width())}
                        data-pswp-height={String(height())}
                        aria-label={item.title ?? item.image}
                      >
                        <div class="image-container">
                          <img
                            class="story-album-img"
                            src={imagePlaceholderSvg({
                              width: width(),
                              height: height(),
                            })}
                            data-src={item.image}
                            width={width()}
                            height={height()}
                            alt={item.title ?? ""}
                            decoding="async"
                          />
                        <Show when={!!item.title}>
                          <div class="image-title">{item.title}</div>
                        </Show>
                        <Show when={!!item.title}>
                          <span class="hidden-caption-content">
                            <strong>{item.title}</strong>
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
        </div>
      </Main>
      <Footer ctx={ctx()} config={cfg()} />
    </>
  );
};
