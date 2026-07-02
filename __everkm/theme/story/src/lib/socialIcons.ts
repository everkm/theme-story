import facebookSvg from "../assets/icons/socials/facebook.svg";
import githubSvg from "../assets/icons/socials/github.svg";
import linkedinSvg from "../assets/icons/socials/linkedin.svg";
import mailSvg from "../assets/icons/socials/mail.svg";
import pinterestSvg from "../assets/icons/socials/pinterest.svg";
import telegramSvg from "../assets/icons/socials/telegram.svg";
import whatsappSvg from "../assets/icons/socials/whatsapp.svg";
import xSvg from "../assets/icons/socials/x.svg";

const SOCIAL_ICON_MAP: Record<string, string> = {
  facebook: facebookSvg,
  github: githubSvg,
  linkedin: linkedinSvg,
  mail: mailSvg,
  email: mailSvg,
  pinterest: pinterestSvg,
  telegram: telegramSvg,
  whatsapp: whatsappSvg,
  x: xSvg,
  twitter: xSvg,
};

export function getSocialIcon(name: string): string | undefined {
  return SOCIAL_ICON_MAP[name.toLowerCase().trim()];
}
