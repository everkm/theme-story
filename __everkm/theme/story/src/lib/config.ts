export interface StorySiteConfig {
  name: string;
  description: string;
  author?: string;
  profile?: string;
  lang?: string;
  timezone?: string;
  dir?: string;
}

export interface StoryFeatures {
  light_and_dark_mode?: boolean;
  show_archives?: boolean;
  show_back_button?: boolean;
  view_transitions?: boolean;
  preloader?: boolean;
  particles?: boolean;
  home_banner?: boolean;
  home_sidebar?: boolean;
  edit_post?: { enabled?: boolean; url?: string };
}

export interface StoryBannerSubtitleConfig {
  text?: string[];
  typing_speed?: number;
  backing_speed?: number;
  backing_delay?: number;
  starting_delay?: number;
  loop?: boolean;
  smart_backspace?: boolean;
  hitokoto?: {
    enable?: boolean;
    show_author?: boolean;
    api?: string;
  };
}

export interface StoryBannerConfig {
  enable?: boolean;
  style?: "fixed" | "static";
  image?: { light?: string; dark?: string };
  title?: string;
  subtitle?: string | StoryBannerSubtitleConfig;
}

export interface StorySidebarConfig {
  enable?: boolean;
  position?: "left" | "right";
  announcement?: string;
}

export interface StoryNavLink {
  label: string;
  path: string;
  external?: boolean;
  /** Icon key: home, archives, github, album, links, about, … */
  icon?: string;
}

export interface StoryThemeConfig {
  colors?: { primary?: string; default_mode?: string };
  home_banner?: StoryBannerConfig;
  home_sidebar?: StorySidebarConfig;
  navbar?: {
    auto_hide?: boolean;
    color?: { left?: string; right?: string };
    links?: StoryNavLink[];
  };
  global?: {
    scroll_progress?: { bar?: boolean };
    scroll_tools?: { enable?: boolean };
    preloader?: { message?: string; max_duration_ms?: number };
  };
  articles?: {
    toc?: { enable?: boolean; max_depth?: number };
    copyright?: { enable?: boolean; default?: string };
  };
}

export interface StoryConfig {
  site: StorySiteConfig;
  home?: string;
  about?: string;
  links?: string;
  posts?: {
    per_page?: number;
    per_index?: number;
    featured_tag?: string;
  };
  features?: StoryFeatures;
  story?: StoryThemeConfig;
  socials?: { name: string; url: string }[];
  share_links?: { name: string; url: string }[];
  copyright?: { text?: string; link?: string };
}

const DEFAULTS: StoryConfig = {
  site: {
    name: "Story",
    description: "",
    lang: "zh",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  home: "/_home.md",
  about: "/_about.md",
  links: "/_links.md",
  posts: {
    per_page: 10,
    per_index: 10,
    featured_tag: "featured",
  },
  features: {
    light_and_dark_mode: true,
    show_archives: true,
    show_back_button: true,
    view_transitions: true,
    preloader: false,
    particles: false,
    home_banner: true,
    home_sidebar: true,
    edit_post: { enabled: false },
  },
  story: {
    colors: { primary: "#A31F34", default_mode: "light" },
    global: {
      scroll_progress: { bar: false },
      scroll_tools: { enable: true },
    },
    home_banner: {
      enable: true,
      style: "fixed",
      image: {
        light: "/assets/images/main_bg_ligth.jpg",
        dark: "/assets/images/main_bg.jpg",
      },
    },
    home_sidebar: { enable: true, position: "left" },
  },
  socials: [],
  share_links: [],
};

export function resolveInnerLinkPath(link?: string): string {
  if (!link) return "";
  const m = link.match(/^\[\[([^\]]+)\]\]$/);
  if (m) {
    const name = m[1];
    if (name.startsWith("/")) return name;
    return name.endsWith(".md") ? `/${name}` : `/${name}.md`;
  }
  return link.startsWith("/") ? link : `/${link}`;
}

export function getStoryConfig(ctx: PageContext): StoryConfig {
  const raw = (ctx.config || {}) as Partial<StoryConfig>;
  return {
    ...DEFAULTS,
    ...raw,
    site: { ...DEFAULTS.site, ...raw.site },
    posts: { ...DEFAULTS.posts, ...raw.posts },
    features: { ...DEFAULTS.features, ...raw.features },
    story: {
      ...DEFAULTS.story,
      ...raw.story,
      home_banner: { ...DEFAULTS.story?.home_banner, ...raw.story?.home_banner },
    home_sidebar: { ...DEFAULTS.story?.home_sidebar, ...raw.story?.home_sidebar },
    navbar: { ...DEFAULTS.story?.navbar, ...raw.story?.navbar },
    global: { ...DEFAULTS.story?.global, ...raw.story?.global },
  },
    socials: raw.socials ?? DEFAULTS.socials,
    share_links: raw.share_links ?? DEFAULTS.share_links,
  };
}
