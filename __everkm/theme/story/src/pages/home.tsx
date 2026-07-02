import { Component, For, Show } from "solid-js";
import { getStoryConfig } from "../lib/config";
import { HOME_PATH } from "../lib/postsPath";
import { queryPublicPosts } from "../lib/postsQuery";
import { readPagination } from "../lib/pagination";
import { pageUrl } from "../lib/url";
import { Header } from "../layout/Header";
import { Footer } from "../components/Footer";
import { HomeArticleCard } from "../components/HomeArticleCard";
import { Pagination } from "../components/Pagination";
import { HomeBanner } from "../components/HomeBanner";
import { HomeSidebar } from "../components/HomeSidebar";

type HomePageProps = {
  props: PageContext;
};

export const HomePage: Component<HomePageProps> = (p) => {
  const ctx = () => p.props;
  const cfg = () => getStoryConfig(ctx());

  const allPosts = () => queryPublicPosts(ctx().request_id);
  const pagination = () =>
    readPagination(ctx().qs ?? {}, ctx().config ?? {}, allPosts().total);

  const items = () =>
    queryPublicPosts(ctx().request_id, {
      offset: pagination().offset,
      limit: pagination().pageSize,
    }).items;

  const sidebarPosition = () => cfg().story?.home_sidebar?.position ?? "left";
  const bannerFixed = () =>
    cfg().features?.home_banner !== false &&
    cfg().story?.home_banner?.enable !== false &&
    cfg().story?.home_banner?.style === "fixed";

  return (
    <main
      class="page-container story-page-home"
      id="main-content"
      data-layout="home"
      data-home-path={pageUrl(ctx().request_id, "/index.html")}
      classList={{ "story-page-home--fixed-banner": bannerFixed() }}
    >
      <HomeBanner ctx={ctx()} cfg={cfg()} />

      <div class="main-content-container">
        <div class="main-content-header">
          <Header ctx={ctx()} mode="home" />
        </div>

        <div class="main-content-body">
          <Show when={sidebarPosition() === "left"}>
            <HomeSidebar
              ctx={ctx()}
              cfg={cfg()}
              postCount={allPosts().total}
            />
          </Show>

          <div class="main-content">
            <div class="home-content-container">
              <ul class="home-article-list">
                <For each={items()}>
                  {(post) => <HomeArticleCard ctx={ctx()} post={post} />}
                </For>
              </ul>
              <Pagination
                ctx={ctx()}
                pageNo={pagination().pageNo}
                pageCount={pagination().pageCount}
                basePath={HOME_PATH}
              />
            </div>
          </div>

          <Show when={sidebarPosition() === "right"}>
            <HomeSidebar
              ctx={ctx()}
              cfg={cfg()}
              postCount={allPosts().total}
            />
          </Show>
        </div>

        <Footer
          ctx={ctx()}
          config={cfg()}
          noMarginTop={pagination().pageCount > 1}
        />
      </div>
    </main>
  );
};
