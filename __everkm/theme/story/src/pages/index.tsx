import { renderToStringAsync } from "solid-js/web";
import { RootLayout } from "../layout/RootLayout";
import { resolvePageKey } from "../lib/normalizeTplPath";
import { getStoryConfig, resolveInnerLinkPath } from "../lib/config";
import { configValue } from "../lib/configValue";
import { HomePage } from "./home";
import { AboutPage } from "./about";
import { PostPage } from "./post";
import { PostsListPage } from "./posts-list";
import { TagsIndexPage } from "./tags-index";
import { TagPostsPage } from "./tag-posts";
import { ArchivesPage } from "./archives";
import { LinksPage } from "./links";
import { AlbumPage } from "./album";
import { NotFoundPage } from "./not-found";
import { dataSourceTitle } from "../lib/dataSource";

function renderPageBody(pageKey: string, props: PageContext) {
  switch (pageKey) {
    case "home":
      return <HomePage props={props} />;
    case "about":
      return <AboutPage props={props} />;
    case "post":
      return <PostPage props={props} />;
    case "posts-list":
      return <PostsListPage props={props} />;
    case "tags-index":
      return <TagsIndexPage props={props} />;
    case "tag-posts":
      return <TagPostsPage props={props} />;
    case "archives":
      return <ArchivesPage props={props} />;
    case "links":
      return <LinksPage props={props} />;
    case "album":
      return <AlbumPage props={props} />;
    case "not-found":
      return <NotFoundPage props={props} />;
    default:
      return <NotFoundPage props={props} />;
  }
}

function resolveLayoutTitle(
  pageKey: string,
  props: PageContext,
  cfg: ReturnType<typeof getStoryConfig>,
): string | undefined {
  const siteName = cfg.site.name;
  if (pageKey === "home") {
    const desc = cfg.site.description;
    return desc ? `${siteName} - ${desc}` : siteName;
  }
  if (pageKey === "about") {
    const aboutPath = resolveInnerLinkPath(cfg.about) || "/_about.md";
    const aboutMeta = everkm.post_detail(props.request_id, {
      path: aboutPath,
      allow_missing: true,
    });
    const aboutTitle = aboutMeta?.title;
    return aboutTitle ? `${aboutTitle} | ${siteName}` : undefined;
  }
  if (pageKey === "links") {
    const title = dataSourceTitle(
      props,
      cfg.links,
      "/_links.md",
      "Links",
    );
    return `${title} | ${siteName}`;
  }
  if (pageKey === "album") {
    const title = dataSourceTitle(
      props,
      cfg.album,
      "/_album.md",
      "Album",
    );
    return `${title} | ${siteName}`;
  }
  if (pageKey === "not-found") {
    return `404 | ${siteName}`;
  }
  return undefined;
}

async function renderPage(compName: string, props: PageContext) {
  const pageKey = resolvePageKey(compName, props.tpl_path, props.post);
  const cfg = getStoryConfig(props);
  const title = resolveLayoutTitle(pageKey, props, cfg);

  const html = await renderToStringAsync(() => (
    <RootLayout context={props} title={title}>
      {renderPageBody(pageKey, props)}
    </RootLayout>
  ));

  const cssStory =
    everkm.assets(props.request_id, { type: "css", section: "story" }) || "";
  const cssSearch = configValue(props.config, "algolia_search")
    ? everkm.assets(props.request_id, {
        type: "css",
        section: "plugin-in-search",
      }) || ""
    : "";
  const jsStory =
    everkm.assets(props.request_id, { type: "js", section: "story" }) || "";
  const jsSearch = configValue(props.config, "algolia_search")
    ? everkm.assets(props.request_id, {
        type: "js",
        section: "plugin-in-search",
      }) || ""
    : "";

  const withCss = html.replace(/<\/head>/i, `${cssStory}${cssSearch}</head>`);
  const withJs = withCss.replace(/<\/body>/i, `${jsStory}${jsSearch}</body>`);
  return `<!DOCTYPE html>${withJs}`;
}

export { renderPage };
