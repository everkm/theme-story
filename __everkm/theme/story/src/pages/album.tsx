import { Component, For, Show } from "solid-js";
import { queryAlbumImages } from "../lib/albumQuery";
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
                {(item) => (
                  <div class="album-item">
                    <a
                      class="story-album-link"
                      href={item.image}
                      aria-label={item.title ?? item.image}
                    >
                      <div class="image-container">
                        <img src={item.image} alt={item.title ?? ""} />
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
                )}
              </For>
            </div>
          </Show>
        </div>
      </Main>
      <Footer ctx={ctx()} config={cfg()} />
    </>
  );
};
