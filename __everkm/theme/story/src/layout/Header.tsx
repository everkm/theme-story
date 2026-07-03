import { Component, For, Show } from "solid-js";
import { getStoryConfig, type StoryNavLink } from "../lib/config";
import { useTranslations } from "../lib/i18n";
import { currentPagePath, isActivePath, pageUrl } from "../lib/url";
import { Icon } from "../components/Icon";
import IconMenuDeep from "../assets/icons/IconMenuDeep.svg";
import IconX from "../assets/icons/IconX.svg";
import IconArchive from "../assets/icons/IconArchive.svg";
import { configValue } from "../lib/configValue";
import { resolveNavIcon } from "../lib/navIcons";
import IconHome from "../assets/icons/IconHome.svg";
import IconPhoto from "../assets/icons/IconPhoto.svg";
import IconLink from "../assets/icons/IconLink.svg";
import IconInfoCircle from "../assets/icons/IconInfoCircle.svg";
import IconGithub from "../assets/icons/socials/github.svg";

type HeaderProps = {
  ctx: PageContext;
  mode?: "home" | "default";
  /** True only on home page 1 with full hero banner. */
  hasHomeBanner?: boolean;
};

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  if (h.length !== 6) return `rgba(0,0,0,${alpha})`;
  const r = Number.parseInt(h.slice(0, 2), 16);
  const g = Number.parseInt(h.slice(2, 4), 16);
  const b = Number.parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function resolveNavHref(ctx: PageContext, link: StoryNavLink): string {
  if (link.external || /^https?:\/\//i.test(link.path)) {
    return link.path;
  }
  return pageUrl(ctx.request_id, link.path);
}

function resolveNavActivePath(link: StoryNavLink): string {
  if (link.external || /^https?:\/\//i.test(link.path)) {
    return "";
  }
  return link.path;
}

export const Header: Component<HeaderProps> = (props) => {
  const cfg = () => getStoryConfig(props.ctx);
  const t = () => useTranslations(props.ctx.lang);
  const path = () => currentPagePath(props.ctx);
  const isActive = (target: string) => isActivePath(path(), target);
  const isHome = () => props.mode === "home";
  const hasHomeBanner = () => props.hasHomeBanner === true;
  const navLinks = () => cfg().story?.navbar?.links ?? [];
  const useConfigNav = () => navLinks().length > 0;
  const navBackground = () => {
    const left = cfg().story?.navbar?.color?.left ?? "#f78736";
    const right = cfg().story?.navbar?.color?.right ?? "#367df7";
    return `linear-gradient(120deg, ${hexToRgba(left, 0.314)} 0%, ${hexToRgba(right, 0.314)} 100%)`;
  };

  const searchItem = () => (
    <Show when={configValue(props.ctx.config, "algolia_search")}>
      <li class="navbar-item">
        <div id="header-in-search">
          <x-in-search
            app-id={String(
              configValue(props.ctx.config, "algolia_search/app_id", ""),
            )}
            api-key={String(
              configValue(props.ctx.config, "algolia_search/api_key", ""),
            )}
            index={String(
              configValue(
                props.ctx.config,
                "algolia_search/index_name",
                "",
              ),
            )}
            site={String(
              configValue(props.ctx.config, "algolia_search/site", ""),
            )}
            only-button="false"
          />
        </div>
      </li>
    </Show>
  );

  const navLinkLabel = (label: string) => label.toUpperCase();

  const navLinkContent = (iconSvg: string | null, label: string) => (
    <>
      <Show when={iconSvg}>
        <Icon svg={iconSvg!} class="navbar-link__icon" />
      </Show>
      <span class="navbar-link__label">{navLinkLabel(label)}</span>
    </>
  );

  const defaultNavItems = () => (
    <>
      <li class="navbar-item">
        <a
          href={pageUrl(props.ctx.request_id, "/index.html")}
          data-nav-path="/"
          class={isActive("/") ? "active" : undefined}
        >
          {navLinkContent(IconHome, t().nav.home)}
        </a>
      </li>
      <li class="navbar-item">
        <a
          href={pageUrl(props.ctx.request_id, "/tags/index.html")}
          data-nav-path="/tags"
          class={isActive("/tags") ? "active" : undefined}
        >
          {navLinkContent(IconLink, t().nav.tags)}
        </a>
      </li>
      <li class="navbar-item">
        <a
          href={pageUrl(props.ctx.request_id, "/about/")}
          data-nav-path="/about"
          class={isActive("/about") ? "active" : undefined}
        >
          {navLinkContent(IconInfoCircle, t().nav.about)}
        </a>
      </li>
      <Show when={cfg().features?.show_archives !== false}>
        <li class="navbar-item">
          <a
            href={pageUrl(props.ctx.request_id, "/archives/index.html")}
            data-nav-path="/archives"
            class={isActive("/archives") ? "active" : undefined}
          >
            {navLinkContent(IconArchive, t().nav.archives)}
          </a>
        </li>
      </Show>
    </>
  );

  const configNavItems = () => (
    <For each={navLinks()}>
      {(link) => {
        const href = () => resolveNavHref(props.ctx, link);
        const activePath = () => resolveNavActivePath(link);
        const external = () =>
          link.external || /^https?:\/\//i.test(link.path);
        const iconSvg = () => resolveNavIcon(link);

        return (
          <li class="navbar-item">
            <a
              href={href()}
              data-nav-path={activePath() || undefined}
              class={activePath() && isActive(activePath()) ? "active" : undefined}
              target={external() ? "_blank" : undefined}
              rel={external() ? "noopener noreferrer" : undefined}
            >
              {navLinkContent(iconSvg(), link.label)}
            </a>
          </li>
        );
      }}
    </For>
  );

  return (
    <>
      <header
        class="navbar-container"
        classList={{ "navbar-container--page": !isHome() }}
        data-vt-swap="header"
        style={{ background: navBackground() }}
      >
        <div
          class="navbar-content transition-navbar"
          classList={{ "has-home-banner": hasHomeBanner() }}
        >
          <div class="navbar-content__left">
            <a
              href={pageUrl(props.ctx.request_id, "/index.html")}
              class="logo-title"
              data-nav-path="/"
            >
              <h1>{cfg().site.name}</h1>
            </a>
          </div>

          <nav id="nav-menu" class="navbar-content__right">
            <button
              id="menu-btn"
              class="navbar-menu-btn focus-outline"
              aria-label={t().a11y.openMenu}
              aria-expanded="false"
              aria-controls="menu-items"
              data-label-open={t().a11y.openMenu}
              data-label-close={t().a11y.closeMenu}
              type="button"
            >
              <Icon svg={IconX} class="navbar-menu-btn__icon navbar-menu-btn__icon--close" id="close-icon" />
              <Icon svg={IconMenuDeep} class="navbar-menu-btn__icon navbar-menu-btn__icon--open" id="menu-icon" />
            </button>
            <ul id="menu-items" class="navbar-list navbar-list--desktop">
              <Show when={useConfigNav()} fallback={defaultNavItems()}>
                {configNavItems()}
              </Show>
              {searchItem()}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
