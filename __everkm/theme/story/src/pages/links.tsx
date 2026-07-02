import { Component, For, Show } from "solid-js";
import { getStoryConfig } from "../lib/config";
import {
  categoryLabel,
  loadDataSourceDoc,
  parseFriendLinkCategories,
  resolveStoryMediaUrl,
} from "../lib/dataSource";
import { useTranslations } from "../lib/i18n";
import { Header } from "../layout/Header";
import { Footer } from "../components/Footer";
import { PageChrome } from "../components/PageChrome";
import { Main } from "../components/Main";

type LinksPageProps = {
  props: PageContext;
};

export const LinksPage: Component<LinksPageProps> = (p) => {
  const ctx = () => p.props;
  const cfg = () => getStoryConfig(ctx());
  const t = () => useTranslations(ctx().lang);
  const doc = () => loadDataSourceDoc(ctx(), cfg().links, "/_links.md");
  const categories = () => parseFriendLinkCategories(doc()?.meta);
  const originPath = () => doc()?.path ?? "/_links.md";

  return (
    <>
      <Header ctx={ctx()} />
      <PageChrome ctx={ctx()} pageKey="links" />
      <Main
        ctx={ctx()}
        pageKey="links"
        pageTitle={doc()?.title ?? t().pages.linksTitle}
        layout="links"
        hidePageHeader
      >
        <div class="page-template-container">
          <h1 class="page-title-header">
            {doc()?.title ?? t().pages.linksTitle}
          </h1>
          <div class="friends-link-container">
          <Show
            when={categories().length > 0}
            fallback={
              <p class="text-muted-foreground italic">{t().pages.linksEmpty}</p>
            }
          >
            <For each={categories()}>
              {(category) => (
                <section>
                  <Show when={!!categoryLabel(category)}>
                    <h2 class="friends-link-category__title">
                      {categoryLabel(category)}
                    </h2>
                  </Show>
                  <ul
                    class="friends-link-grid"
                    classList={{
                      "friends-link-grid--cards": category.has_thumbnail,
                      "friends-link-grid--list": !category.has_thumbnail,
                    }}
                  >
                    <For each={category.list ?? []}>
                      {(item) => (
                        <li class="friends-link-item">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Show
                              when={category.has_thumbnail}
                              fallback={
                                <div class="friends-link-row">
                                  <Show when={!!item.avatar}>
                                    <div class="friends-link-avatar">
                                      <img
                                        src={resolveStoryMediaUrl(
                                          ctx(),
                                          item.avatar,
                                          originPath(),
                                        )}
                                        alt=""
                                        loading="lazy"
                                      />
                                    </div>
                                  </Show>
                                  <div class="friends-link-meta">
                                    <div class="friends-link-name">
                                      {item.name}
                                    </div>
                                    <Show when={!!item.description}>
                                      <div class="friends-link-desc">
                                        {item.description}
                                      </div>
                                    </Show>
                                  </div>
                                </div>
                              }
                            >
                              <div class="friends-link-card">
                                <Show when={!!item.thumbnail}>
                                  <div class="friends-link-card__thumbnail">
                                    <img
                                      src={resolveStoryMediaUrl(
                                        ctx(),
                                        item.thumbnail,
                                        originPath(),
                                      )}
                                      alt=""
                                      loading="lazy"
                                    />
                                  </div>
                                </Show>
                                <div class="friends-link-card__body">
                                  <Show when={!!item.avatar}>
                                    <div class="friends-link-avatar">
                                      <img
                                        src={resolveStoryMediaUrl(
                                          ctx(),
                                          item.avatar,
                                          originPath(),
                                        )}
                                        alt=""
                                        loading="lazy"
                                      />
                                    </div>
                                  </Show>
                                  <div class="friends-link-meta">
                                    <div class="friends-link-name">
                                      {item.name}
                                    </div>
                                    <Show when={!!item.description}>
                                      <div class="friends-link-desc">
                                        {item.description}
                                      </div>
                                    </Show>
                                  </div>
                                </div>
                              </div>
                            </Show>
                          </a>
                        </li>
                      )}
                    </For>
                  </ul>
                </section>
              )}
            </For>
          </Show>
          <Show when={!!doc()?.content_html}>
            <div
              class="app-prose mt-8"
              innerHTML={doc()!.content_html!}
            />
          </Show>
        </div>
        </div>
      </Main>
      <Footer ctx={ctx()} config={cfg()} />
    </>
  );
};
