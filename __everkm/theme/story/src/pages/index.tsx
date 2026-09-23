import { renderToStringAsync } from "solid-js/web";
import { RootLayout } from "../layout/RootLayout";
import { resolvePageKey } from "../lib/normalizeTplPath";
import { getStoryConfig, resolveInnerLinkPath } from "../lib/config";
import { configValue } from "../lib/configValue";
import { pageNotFound } from "../lib/jsRenderError";
import { resolvePostDetail } from "../lib/postDetail";
import { dataSourceTitle, loadDataSourceDoc } from "../lib/dataSource";
import { useTranslations } from "../lib/i18n";
import { HomePage } from "./home";
import { AboutPage, loadAboutDoc } from "./about";
import { PostPage } from "./post";
import { PostsListPage } from "./posts-list";
import { TagsIndexPage } from "./tags-index";
import { TagPostsPage } from "./tag-posts";
import { ArchivesPage } from "./archives";
import { LinksPage } from "./links";
import { AlbumPage } from "./album";
import { NotFoundPage } from "./not-found";

async function renderPageBody(pageKey: string, props: PageContext) {
  switch (pageKey) {
    case "home":
      return <HomePage props={props} />;
    case "about": {
      const aboutDoc = await loadAboutDoc(props);
      return <AboutPage props={props} aboutDoc={aboutDoc} />;
    }
    case "post": {
      const post = await resolvePostDetail(props);
      return <PostPage props={props} post={post} />;
    }
    case "posts-list":
      return <PostsListPage props={props} />;
    case "tags-index":
      return <TagsIndexPage props={props} />;
    case "tag-posts":
      return <TagPostsPage props={props} />;
    case "archives":
      return <ArchivesPage props={props} />;
    case "links": {
      const cfg = getStoryConfig(props);
      const doc = await loadDataSourceDoc(props, cfg.links, "/_links.md");
      return <LinksPage props={props} doc={doc} />;
    }
    case "album":
      return <AlbumPage props={props} />;
    case "not-found":
      return <NotFoundPage props={props} />;
    default:
      throw pageNotFound(
        `Page ${pageKey} not found (compName=${props.tpl_path})`,
      );
  }
}

async function resolveLayoutTitle(
  pageKey: string,
  props: PageContext,
  cfg: ReturnType<typeof getStoryConfig>,
): Promise<string | undefined> {
  const siteName = cfg.site.name;
  if (pageKey === "home") {
    const desc = cfg.site.description;
    return desc ? `${siteName} - ${desc}` : siteName;
  }
  if (pageKey === "about") {
    const aboutPath = resolveInnerLinkPath(cfg.about) || "/_about.md";
    const aboutMeta = await everkm.post_detail(props.request_id, {
      path: aboutPath,
      allow_missing: true,
    });
    const aboutTitle = aboutMeta?.title;
    return aboutTitle ? `${aboutTitle} | ${siteName}` : undefined;
  }
  if (pageKey === "links") {
    const title = await dataSourceTitle(
      props,
      cfg.links,
      "/_links.md",
      "Links",
    );
    return `${title} | ${siteName}`;
  }
  if (pageKey === "album") {
    const t = useTranslations(cfg.site.lang);
    return `${t.pages.albumTitle} | ${siteName}`;
  }
  if (pageKey === "not-found") {
    return `404 | ${siteName}`;
  }
  return undefined;
}

async function renderPage(compName: string, props: PageContext) {
  const pageKey = resolvePageKey(compName, props.tpl_path, props.post);
  const cfg = getStoryConfig(props);
  const title = await resolveLayoutTitle(pageKey, props, cfg);
  const body = await renderPageBody(pageKey, props);

  const html = await renderToStringAsync(() => (
    <RootLayout context={props} title={title}>
      {body}
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
