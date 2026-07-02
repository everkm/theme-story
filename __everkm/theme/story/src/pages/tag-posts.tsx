import { Component, For } from "solid-js";
import { getStoryConfig } from "../lib/config";
import { useTranslations } from "../lib/i18n";
import { extractTagSlug, normalizeTplPath } from "../lib/normalizeTplPath";
import { queryPublicPosts } from "../lib/postsQuery";
import { readPagination } from "../lib/pagination";
import { Header } from "../layout/Header";
import { Footer } from "../components/Footer";
import { PageChrome } from "../components/PageChrome";
import { Main } from "../components/Main";
import { HomeArticleCard } from "../components/HomeArticleCard";
import { Pagination } from "../components/Pagination";

type TagPostsPageProps = {
  props: PageContext;
};

export const TagPostsPage: Component<TagPostsPageProps> = (p) => {
  const ctx = () => p.props;
  const cfg = () => getStoryConfig(ctx());
  const t = () => useTranslations(ctx().lang);

  const tagSlug = () => {
    const key = normalizeTplPath(ctx().tpl_path ?? "");
    return extractTagSlug(key) ?? "";
  };

  const tagName = () => decodeURIComponent(tagSlug());

  const all = () => queryPublicPosts(ctx().request_id, { tags: [tagName()] });

  const pagination = () =>
    readPagination(ctx().qs ?? {}, ctx().config ?? {}, all().total);

  const items = () =>
    queryPublicPosts(ctx().request_id, {
      tags: [tagName()],
      offset: pagination().offset,
      limit: pagination().pageSize,
    }).items;

  const basePath = () => `/tags/${encodeURIComponent(tagName())}`;

  return (
    <>
      <Header ctx={ctx()} />
      <PageChrome ctx={ctx()} pageKey="tag-posts" />
      <Main
        ctx={ctx()}
        pageKey="tag-posts"
        pageTitle={`${t().pages.tagTitle}: ${tagName()}`}
        pageDesc={t().pages.tagDesc}
        layout="tag-posts"
      >
        <ul class="home-article-list">
          <For each={items()}>
            {(post) => <HomeArticleCard ctx={ctx()} post={post} />}
          </For>
        </ul>
      </Main>
      <Pagination
        ctx={ctx()}
        pageNo={pagination().pageNo}
        pageCount={pagination().pageCount}
        basePath={basePath()}
      />
      <Footer
        ctx={ctx()}
        config={cfg()}
        noMarginTop={pagination().pageCount > 1}
      />
    </>
  );
};
