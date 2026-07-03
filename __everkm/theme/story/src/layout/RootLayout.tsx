import { ParentComponent, Show } from "solid-js";
import { getStoryConfig } from "../lib/config";
import { useTranslations } from "../lib/i18n";
import { pageUrl } from "../lib/url";
import { ScrollTools } from "../components/ScrollTools";
import { Preloader } from "../components/Preloader";

const FOUC_SCRIPT = `(function () {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = stored ?? (prefersDark ? "dark" : "light");
  const root = document.documentElement;
  const isDark = theme === "dark";
  root.setAttribute("data-theme", theme);
  root.classList.toggle("dark", isDark);
  root.classList.toggle("light", !isDark);
  root.style.colorScheme = theme;
  document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.toggle("dark-mode", isDark);
    document.body.classList.toggle("light-mode", !isDark);
  });
  window.__theme = { value: theme };
})();`;

type RootLayoutProps = {
  context: PageContext;
  title?: string;
  description?: string;
};

export const RootLayout: ParentComponent<RootLayoutProps> = (props) => {
  const ctx = () => props.context;
  const cfg = () => getStoryConfig(ctx());
  const siteName = () => cfg().site.name;
  const postMeta = () => ctx().post;
  const postTitle = () => postMeta()?.title ?? "";
  const pageTitle = () =>
    props.title ??
    (postTitle() ? `${postTitle()} | ${siteName()}` : siteName());
  const metaDesc = () =>
    props.description ??
    postMeta()?.summary ??
    cfg().site.description ??
    "";
  const baseUrl = () => everkm.base_url(ctx().request_id);
  const lang = () => ctx().lang || cfg().site.lang || "en";
  const dir = () => cfg().site.dir ?? "ltr";
  const customBodyEndHtml = () => (ctx().config?.body_end_html as string) || "";
  const navbarAutoHide = () =>
    cfg().story?.navbar?.auto_hide !== false ? "true" : "false";
  const scrollProgressBar = () =>
    cfg().story?.global?.scroll_progress?.bar === true ? "true" : "false";
  const particlesEnabled = () => cfg().features?.particles === true;
  const t = () => useTranslations(lang());

  return (
    <html lang={lang()} dir={dir()} class="overflow-y-scroll scroll-smooth">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle()}</title>
        <meta name="title" content={pageTitle()} />
        <meta name="description" content={metaDesc()} />
        <meta
          name="generator"
          content={`everkm-publish@v${ctx().everkm_publish_version}`}
        />
        <meta
          name="theme"
          content={`${ctx().theme_name}@${ctx().theme_version}`}
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href={pageUrl(ctx().request_id, "/assets/favicon.svg")}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="" />
        <script innerHTML={FOUC_SCRIPT} />
        <script
          innerHTML={`
          window.__everkm_lang = ${JSON.stringify(lang())};
          window.__everkm_base_url = ${JSON.stringify(baseUrl() + "/")};
          window.__everkm_features_view_transitions = ${JSON.stringify(cfg().features?.view_transitions !== false)};
          window.__everkm_env_is_preview = ${JSON.stringify(!!ctx().env_is_preview)};
          `}
        />
      </head>
      <body
        class="bg-background font-app text-foreground selection:bg-accent/75 selection:text-accent-foreground flex min-h-svh flex-col"
        data-navbar-auto-hide={navbarAutoHide()}
        data-scroll-progress-bar={scrollProgressBar()}
        data-particles={particlesEnabled() ? "true" : "false"}
      >
        <Preloader ctx={ctx()} />
        <a
          id="skip-to-content"
          href="#main-content"
          class="bg-background text-accent absolute inset-s-16 -top-full z-50 px-3 py-2 backdrop-blur-lg transition-all focus:top-4"
        >
          {t().a11y.skipToContent}
        </a>
        {props.children}
        <Show when={particlesEnabled()}>
          <div
            id="particles-js"
            class="story-particles"
            data-vt-persist
            aria-hidden="true"
          />
        </Show>
        <ScrollTools ctx={ctx()} />
        <Show when={particlesEnabled()}>
          <script
            src={pageUrl(ctx().request_id, "/assets/vendor/particles.min.js")}
          />
        </Show>
        <Show when={!!customBodyEndHtml()}>
          <div innerHTML={customBodyEndHtml()} />
        </Show>
      </body>
    </html>
  );
};
