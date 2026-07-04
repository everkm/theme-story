import { Component, For } from "solid-js";
import { getStoryConfig } from "../lib/config";
import {
  groupArchiveByDateLabel,
  groupArchiveByYear,
} from "../lib/archives";
import { queryPublicPosts } from "../lib/postsQuery";
import { useTranslations } from "../lib/i18n";
import { Header } from "../layout/Header";
import { Footer } from "../components/Footer";
import { PageChrome } from "../components/PageChrome";
import { Main } from "../components/Main";

type ArchivesPageProps = {
  props: PageContext;
};

export const ArchivesPage: Component<ArchivesPageProps> = (p) => {
  const ctx = () => p.props;
  const cfg = () => getStoryConfig(ctx());
  const t = () => useTranslations(ctx().lang);

  const years = () => groupArchiveByYear(queryPublicPosts(ctx().request_id).items);

  return (
    <>
      <Header ctx={ctx()} />
      <PageChrome ctx={ctx()} pageKey="archives" />
      <Main
        ctx={ctx()}
        pageKey="archives"
        pageTitle={t().pages.archivesTitle}
        pageDesc={t().pages.archivesDesc}
        layout="archives"
        hidePageHeader
      >
        <div class="archive-container">
          <div class="archive-list-container">
            <For each={years()}>
              {(yearGroup) => (
                <section class="archive-item">
                  <div class="archive-item__header">
                    <span class="archive-year">{yearGroup.year}</span>
                    <span class="archive-year-post-count">
                      {yearGroup.posts.length}
                    </span>
                  </div>
                  <ul class="archive-article-list">
                    <For each={groupArchiveByDateLabel(yearGroup.posts)}>
                      {(dateGroup) => (
                        <li
                          class="archive-article-item"
                          data-date-label={dateGroup.dateLabel}
                        >
                          <For each={dateGroup.posts}>
                            {(post) => (
                              <a
                                class="archive-article-link"
                                href={post.url_path}
                              >
                                <span class="archive-article-title">
                                  {post.title || post.slug}
                                </span>
                              </a>
                            )}
                          </For>
                        </li>
                      )}
                    </For>
                  </ul>
                </section>
              )}
            </For>
          </div>
        </div>
      </Main>
      <Footer ctx={ctx()} config={cfg()} />
    </>
  );
};
