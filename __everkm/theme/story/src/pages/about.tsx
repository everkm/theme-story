import { Component, Show } from "solid-js";
import { getStoryConfig, resolveInnerLinkPath } from "../lib/config";
import { maybeAwait } from "../lib/engineCompat";
import { useTranslations } from "../lib/i18n";
import { Header } from "../layout/Header";
import { Footer } from "../components/Footer";
import { PageChrome } from "../components/PageChrome";
import { Main } from "../components/Main";
import { APP_PROSE } from "../lib/proseClasses";

type AboutPageProps = {
  props: PageContext;
  aboutDoc: PostItem | null;
};

export async function loadAboutDoc(ctx: PageContext): Promise<PostItem | null> {
  const cfg = getStoryConfig(ctx);
  const aboutPath = resolveInnerLinkPath(cfg.about) || "/_about.md";
  return (
    (await maybeAwait(
      everkm.post_detail(ctx.request_id, {
      path: aboutPath,
      allow_missing: true,
      }),
    )) ?? null
  );
}

export const AboutPage: Component<AboutPageProps> = (p) => {
  const ctx = () => p.props;
  const cfg = () => getStoryConfig(ctx());
  const t = () => useTranslations(ctx().lang);
  const aboutDoc = p.aboutDoc;
  const pageTitle = aboutDoc?.title ?? t().nav.about;

  return (
    <>
      <Header ctx={ctx()} />
      <PageChrome ctx={ctx()} pageKey="about" />
      <Main
        ctx={ctx()}
        pageKey="about"
        pageTitle={pageTitle}
        layout="about"
        hidePageHeader
      >
        <div class="page-template-container">
          <h1 class="page-title-header">{pageTitle}</h1>
          <div class={`page-template-content ${APP_PROSE}`}>
            <Show
              when={aboutDoc?.content_html}
              fallback={
                <p class="text-muted-foreground italic">{t().pages.aboutEmpty}</p>
              }
            >
              <div innerHTML={aboutDoc!.content_html!} />
            </Show>
          </div>
        </div>
      </Main>
      <Footer ctx={ctx()} config={cfg()} />
    </>
  );
};
