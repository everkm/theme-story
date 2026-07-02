import { Component, Show } from "solid-js";
import type { StoryConfig } from "../lib/config";
import { assetUrl, pageUrl } from "../lib/url";
import { useTranslations } from "../lib/i18n";

type HomeSidebarProps = {
  ctx: PageContext;
  cfg: StoryConfig;
  postCount?: number;
};

export const HomeSidebar: Component<HomeSidebarProps> = (props) => {
  const t = () => useTranslations(props.ctx.lang);
  const sidebar = () => props.cfg.story?.home_sidebar;
  const enabled = () =>
    props.cfg.features?.home_sidebar !== false && sidebar()?.enable !== false;
  const avatar = () =>
    props.cfg.site.profile || "/assets/images/avatar-0.jpg";

  return (
    <Show when={enabled()}>
      <div class="home-sidebar-container">
        <div class="home-sidebar-container__sticky">
          <div class="sidebar-links">
            <div class="site-info">
              <div class="site-name">{props.cfg.site.name}</div>
              <Show when={!!sidebar()?.announcement}>
                <div class="announcement">{sidebar()?.announcement}</div>
              </Show>
            </div>
            <a
              class="links"
              href={pageUrl(props.ctx.request_id, "/archives/index.html")}
            >
              <span class="link-name">{t().nav.archives}</span>
            </a>
          </div>

          <div class="sidebar-content">
            <div class="avatar">
              <img
                src={assetUrl(props.ctx.request_id, avatar())}
                alt={props.cfg.site.author ?? props.cfg.site.name}
              />
            </div>
            <Show when={!!props.cfg.site.author}>
              <div class="author">
                <div class="name">{props.cfg.site.author}</div>
                <Show when={!!props.cfg.site.description}>
                  <div class="label">{props.cfg.site.description}</div>
                </Show>
              </div>
            </Show>
            <div class="statistics">
              <a
                class="tag-count-item"
                href={pageUrl(props.ctx.request_id, "/archives/index.html")}
              >
                <div class="number">{props.postCount ?? 0}</div>
                <div class="label">{t().home.postsCount}</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};
