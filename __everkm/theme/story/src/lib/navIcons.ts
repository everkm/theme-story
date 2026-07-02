import IconArchive from "../assets/icons/IconArchive.svg";
import IconHome from "../assets/icons/IconHome.svg";
import IconInfoCircle from "../assets/icons/IconInfoCircle.svg";
import IconLink from "../assets/icons/IconLink.svg";
import IconPhoto from "../assets/icons/IconPhoto.svg";
import IconGithub from "../assets/icons/socials/github.svg";
import type { StoryNavLink } from "./config";

const NAV_ICONS: Record<string, string> = {
  home: IconHome,
  archive: IconArchive,
  archives: IconArchive,
  github: IconGithub,
  photo: IconPhoto,
  album: IconPhoto,
  image: IconPhoto,
  masonry: IconPhoto,
  link: IconLink,
  links: IconLink,
  info: IconInfoCircle,
  about: IconInfoCircle,
};

function inferIconKey(link: StoryNavLink): string | null {
  const path = link.path.toLowerCase();
  if (/github\.com/i.test(path)) return "github";
  if (path.includes("archives")) return "archives";
  if (path.includes("/album") || path.includes("masonry")) return "album";
  if (path.includes("/links")) return "links";
  if (path.includes("/about")) return "about";
  if (path === "/" || path === "/index.html") return "home";
  return null;
}

export function resolveNavIcon(link: StoryNavLink): string | null {
  const key = link.icon?.trim().toLowerCase();
  if (key && NAV_ICONS[key]) return NAV_ICONS[key];
  const inferred = inferIconKey(link);
  return inferred ? NAV_ICONS[inferred] : null;
}
