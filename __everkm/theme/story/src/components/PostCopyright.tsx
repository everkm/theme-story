import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Component, Show } from "solid-js";
import { getStoryConfig } from "../lib/config";
import { resolveCopyrightLicense } from "../lib/copyright";
import { useTranslations } from "../lib/i18n";
import { resolvePostCanonicalUrl } from "../lib/postCover";

dayjs.extend(utc);
dayjs.extend(timezone);

type PostCopyrightProps = {
  ctx: PageContext;
  post: PostItem;
};

function formatTs(ts: number | undefined, timezoneName: string): string | null {
  if (!ts) return null;
  return dayjs.unix(ts).tz(timezoneName).format("YYYY-MM-DD HH:mm:ss");
}

function publishedTs(post: PostItem): number | null {
  return post.date || post.updated_at || null;
}

function updatedTs(post: PostItem): number | null {
  const published = publishedTs(post);
  if (!post.updated_at || post.updated_at === published) return null;
  return post.updated_at;
}

export const PostCopyright: Component<PostCopyrightProps> = (props) => {
  const cfg = () => getStoryConfig(props.ctx);
  const t = () => useTranslations(props.ctx.lang);
  const copyrightCfg = () => cfg().story?.articles?.copyright;
  const enabled = () => copyrightCfg()?.enable !== false;
  const licenseKey = () => {
    const fromMeta = props.post.meta?.copyright;
    if (typeof fromMeta === "string" && fromMeta.trim()) {
      return fromMeta.trim();
    }
    return copyrightCfg()?.default ?? "cc_by_nc_sa";
  };
  const license = () => resolveCopyrightLicense(licenseKey());
  const tz = () => cfg().site.timezone ?? "UTC";
  const canonical = () => resolvePostCanonicalUrl(props.ctx, props.post);

  return (
    <Show when={enabled() && license()}>
      <div class="post-copyright">
        <div class="article-copyright-info-container">
          <ul>
            <li>
              <strong>{t().post.copyrightTitle}:</strong>{" "}
              {props.post.title || props.post.slug}
            </li>
            <Show when={!!cfg().site.author}>
              <li>
                <strong>{t().post.copyrightAuthor}:</strong>{" "}
                {cfg().site.author}
              </li>
            </Show>
            <Show when={formatTs(publishedTs(props.post) ?? undefined, tz())}>
              {(created) => (
                <li>
                  <strong>{t().post.copyrightCreated}:</strong> {created()}
                </li>
              )}
            </Show>
            <Show when={formatTs(updatedTs(props.post) ?? undefined, tz())}>
              {(updated) => (
                <li>
                  <strong>{t().post.copyrightUpdated}:</strong> {updated()}
                </li>
              )}
            </Show>
            <li>
              <strong>{t().post.copyrightLink}:</strong> {canonical()}
            </li>
            <li>
              <strong>{t().post.copyrightLicense}:</strong>{" "}
              <Show
                when={license()?.url}
                fallback={<span>{license()?.label}</span>}
              >
                {(url) => (
                  <a href={url()} target="_blank" rel="noopener noreferrer">
                    {license()?.label}
                  </a>
                )}
              </Show>
            </li>
          </ul>
        </div>
      </div>
    </Show>
  );
};
