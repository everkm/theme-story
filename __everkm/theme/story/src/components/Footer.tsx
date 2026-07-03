import { Component, Show } from "solid-js";
import { useTranslations } from "../lib/i18n";
import { pageUrl } from "../lib/url";
import { Socials } from "./Socials";
import type { StoryConfig } from "../lib/config";

type FooterProps = {
  ctx: PageContext;
  config: StoryConfig;
  noMarginTop?: boolean;
};

export const Footer: Component<FooterProps> = (props) => {
  const t = () => useTranslations(props.ctx.lang);
  const year = new Date().getFullYear();
  const siteName = () => props.config.site.name;
  const homeHref = () => pageUrl(props.ctx.request_id, "/index.html");
  const socials = () => props.config.socials ?? [];
  const poweredBy = () => props.config.copyright?.text?.trim();
  const poweredByLink = () => props.config.copyright?.link?.trim();

  return (
    <div
      class="main-content-footer"
      classList={{ "mt-auto": !props.noMarginTop }}
      data-vt-swap="footer"
    >
      <footer class="story-footer">
        <div class="story-footer__info">
          <div class="story-footer__line story-footer__line--primary">
            <span class="story-footer__copyright">
              &#169; {year}{" "}
              <a href={homeHref()} class="mr-2">{siteName()}</a>
              {t().footer.allRightsReserved}
            </span>
            <Show when={socials().length > 0}>
              <span class="story-footer__socials">
                <Socials ctx={props.ctx} socials={socials()} />
              </span>
            </Show>
          </div>
          <Show when={!!poweredBy()}>
            <div class="story-footer__line story-footer__line--secondary">
              <Show
                when={poweredByLink()}
                fallback={<span>{poweredBy()}</span>}
              >
                {(href) => (
                  <>
                    Powered by{" "}
                    <a href={href()} target="_blank" rel="noopener noreferrer">
                      {poweredBy()}
                    </a>
                  </>
                )}
              </Show>
            </div>
          </Show>
        </div>
      </footer>
    </div>
  );
};
