import { Component, For } from "solid-js";
import { getStoryConfig } from "../lib/config";
import { POSTS_CONTENT_DIR } from "../lib/postsPath";
import { useTranslations } from "../lib/i18n";
import { Header } from "../layout/Header";
import { Footer } from "../components/Footer";
import { PageChrome } from "../components/PageChrome";
import { Main } from "../components/Main";
import { TagCloudItem } from "../components/TagCloudItem";

type TagsIndexPageProps = {
  props: PageContext;
};

export const TagsIndexPage: Component<TagsIndexPageProps> = (p) => {
  const ctx = () => p.props;
  const cfg = () => getStoryConfig(ctx());
  const t = () => useTranslations(ctx().lang);

  const tags = () =>
    everkm.posts_tag_list(ctx().request_id, {
      dir: POSTS_CONTENT_DIR,
      recursive: true,
      draft: false,
    });

  const tagEntries = () =>
    Object.entries(tags()).sort(([, aCount], [, bCount]) => bCount - aCount);

  return (
    <>
      <Header ctx={ctx()} />
      <PageChrome ctx={ctx()} pageKey="tags-index" />
      <Main
        ctx={ctx()}
        pageKey="tags-index"
        pageTitle={t().pages.tagsTitle}
        pageDesc={t().pages.tagsDesc}
        layout="tags-index"
      >
        <div class="tagcloud-content">
          <ul class="tag-list" data-show-value="true">
            <For each={tagEntries()}>
              {([tag, count]) => (
                <TagCloudItem ctx={ctx()} tag={tag} count={count} />
              )}
            </For>
          </ul>
        </div>
      </Main>
      <Footer ctx={ctx()} config={cfg()} />
    </>
  );
};
