import { Component } from "solid-js";
import { getStoryConfig } from "../lib/config";
import { useTranslations } from "../lib/i18n";
import { pageUrl } from "../lib/url";
import { Header } from "../layout/Header";
import { Footer } from "../components/Footer";
import { LinkButton } from "../components/LinkButton";

type NotFoundPageProps = {
  props: PageContext;
};

export const NotFoundPage: Component<NotFoundPageProps> = (p) => {
  const ctx = () => p.props;
  const cfg = () => getStoryConfig(ctx());
  const t = () => useTranslations(ctx().lang);

  return (
    <>
      <Header ctx={ctx()} />
      <main
        id="main-content"
        data-layout="not-found"
        class="app-layout flex min-h-[50vh] flex-col items-center justify-center py-16 text-center"
      >
        <p class="text-accent text-7xl font-bold sm:text-8xl">404</p>
        <h1 class="mt-4 text-2xl font-semibold sm:text-3xl">
          {t().pages.notFoundTitle}
        </h1>
        <p class="text-muted-foreground mt-3 max-w-md">
          {t().pages.notFoundDesc}
        </p>
        <LinkButton
          href={pageUrl(ctx().request_id, "/index.html")}
          class="bg-accent text-accent-foreground mt-8 inline-flex rounded-lg px-6 py-2.5 no-underline hover:opacity-90"
        >
          {t().pages.notFoundBackHome}
        </LinkButton>
      </main>
      <Footer ctx={ctx()} config={cfg()} />
    </>
  );
};
