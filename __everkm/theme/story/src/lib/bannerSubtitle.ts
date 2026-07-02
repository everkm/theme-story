import type { StoryBannerSubtitleConfig, StoryConfig } from "./config";

export function resolveBannerSubtitleStrings(cfg: StoryConfig): string[] {
  const sub = cfg.story?.home_banner?.subtitle;
  if (!sub) {
    return cfg.site.description ? [cfg.site.description] : [];
  }
  if (typeof sub === "string") {
    return sub.trim() ? [sub.trim()] : [];
  }
  const texts = sub.text?.filter(Boolean) ?? [];
  if (texts.length > 0) return texts;
  return cfg.site.description ? [cfg.site.description] : [];
}

export function resolveBannerSubtitleConfig(
  cfg: StoryConfig,
): StoryBannerSubtitleConfig | null {
  const sub = cfg.story?.home_banner?.subtitle;
  if (!sub || typeof sub === "string") return null;
  return sub;
}

export function shouldUseBannerTyping(cfg: StoryConfig): boolean {
  const sub = cfg.story?.home_banner?.subtitle;
  if (!sub) return false;
  if (typeof sub === "string") return false;
  if (sub.hitokoto?.enable) return true;
  return (sub.text?.length ?? 0) > 0;
}

export function resolveBannerSubtitleStatic(cfg: StoryConfig): string | null {
  if (shouldUseBannerTyping(cfg)) return null;
  const strings = resolveBannerSubtitleStrings(cfg);
  return strings[0] ?? null;
}
