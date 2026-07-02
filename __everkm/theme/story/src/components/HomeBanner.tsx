import { Component, For, Show } from "solid-js";
import type { StoryConfig } from "../lib/config";
import {
  resolveBannerSubtitleConfig,
  resolveBannerSubtitleStatic,
  resolveBannerSubtitleStrings,
  shouldUseBannerTyping,
} from "../lib/bannerSubtitle";
import { assetUrl } from "../lib/url";
import { Socials } from "./Socials";

type HomeBannerProps = {
  ctx: PageContext;
  cfg: StoryConfig;
};

export const HomeBanner: Component<HomeBannerProps> = (props) => {
  const banner = () => props.cfg.story?.home_banner;
  const enabled = () =>
    props.cfg.features?.home_banner !== false && banner()?.enable !== false;
  const title = () => banner()?.title || props.cfg.site.name || "Story";
  const staticSubtitle = () => resolveBannerSubtitleStatic(props.cfg);
  const typingEnabled = () => shouldUseBannerTyping(props.cfg);
  const typedStrings = () => JSON.stringify(resolveBannerSubtitleStrings(props.cfg));
  const typedConfig = () =>
    JSON.stringify(resolveBannerSubtitleConfig(props.cfg) ?? {});
  const imageLight = () =>
    banner()?.image?.light || "/assets/images/main_bg_ligth.jpg";
  const imageDark = () =>
    banner()?.image?.dark || "/assets/images/main_bg.jpg";
  const isFixed = () => banner()?.style === "fixed";
  const socials = () => props.cfg.socials ?? [];

  return (
    <Show when={enabled()}>
      <Show when={isFixed()}>
        <div class="home-banner-background" aria-hidden="true">
          <img
            src={assetUrl(props.ctx.request_id, imageLight())}
            alt=""
            class="home-banner-background__img--light"
          />
          <img
            src={assetUrl(props.ctx.request_id, imageDark())}
            alt=""
            class="home-banner-background__img--dark"
          />
        </div>
      </Show>

      <section
        class="home-banner-container"
        classList={{ "home-banner-container--static": !isFixed() }}
      >
        <Show when={!isFixed()}>
          <div class="home-banner-container__inline-bg" aria-hidden="true">
            <img
              src={assetUrl(props.ctx.request_id, imageLight())}
              alt=""
              class="home-banner-background__img--light"
            />
            <img
              src={assetUrl(props.ctx.request_id, imageDark())}
              alt=""
              class="home-banner-background__img--dark"
            />
          </div>
        </Show>

        <div class="home-banner-container__content">
          <div class="home-banner-container__description">
            <span>{title()}</span>
            <Show when={typingEnabled()}>
              <p class="home-banner-container__subtitle">
                <span
                  id="home-banner-subtitle"
                  data-typed-config={typedConfig()}
                  data-typed-strings={typedStrings()}
                />
              </p>
            </Show>
            <Show when={!typingEnabled() && !!staticSubtitle()}>
              <p class="home-banner-container__subtitle">{staticSubtitle()}</p>
            </Show>
          </div>

          <div class="home-banner-container__actions">
            <button
              type="button"
              class="home-banner-container__scroll-btn"
              aria-label="Scroll to content"
            >
              ↓
            </button>
            <Show when={socials().length > 0}>
              <div class="home-banner-container__socials">
                <Socials ctx={props.ctx} socials={socials()} />
              </div>
            </Show>
          </div>
        </div>
      </section>
    </Show>
  );
};
