import { Component, For } from "solid-js";
import { getStoryConfig } from "../lib/config";
import { useTranslations } from "../lib/i18n";
import { POSTS_PATH } from "../lib/postsPath";
import { queryPublicPosts } from "../lib/postsQuery";
import { readPagination } from "../lib/pagination";
import { Header } from "../layout/Header";
import { Footer } from "../components/Footer";
import { PageChrome } from "../components/PageChrome";
import { Main } from "../components/Main";
import { HomeArticleCard } from "../components/HomeArticleCard";
import { Pagination } from "../components/Pagination";

type PostsListPageProps = {
  props: PageContext;
};

export const PostsListPage: Component<PostsListPageProps> = (p) => {
  const ctx = () => p.props;
  const cfg = () => getStoryConfig(ctx());
  const t = () => useTranslations(ctx().lang);

  const all = () => queryPublicPosts(ctx().request_id);

  const pagination = () =>
    readPagination(ctx().qs ?? {}, ctx().config ?? {}, all().total);

  const items = () =>
    queryPublicPosts(ctx().request_id, {
      offset: pagination().offset,
      limit: pagination().pageSize,
    }).items;

  return (
    <>
      <Header ctx={ctx()} />
      <PageChrome ctx={ctx()} pageKey="posts-list" />
      <Main
        ctx={ctx()}
        pageKey="posts-list"
        pageTitle={t().pages.postsTitle}
        pageDesc={t().pages.postsDesc}
        layout="posts-list"
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
        basePath={POSTS_PATH}
      />
      <Footer
        ctx={ctx()}
        config={cfg()}
        noMarginTop={pagination().pageCount > 1}
      />
    </>
  );
};
