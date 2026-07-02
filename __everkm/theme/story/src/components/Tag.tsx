import { Component } from "solid-js";
import { pageUrl } from "../lib/url";

type TagProps = {
  ctx: PageContext;
  tag: string;
  count?: number;
};

export const Tag: Component<TagProps> = (props) => {
  const slug = () => encodeURIComponent(props.tag);
  const href = () =>
    pageUrl(props.ctx.request_id, `/tags/${slug()}/index.html`);

  return (
    <li>
      <a
        href={href()}
        class="text-accent decoration-dashed underline-offset-4 hover:underline"
      >
        #{props.tag}
        {props.count != null && (
          <sup class="text-muted-foreground ms-1 text-xs">{props.count}</sup>
        )}
      </a>
    </li>
  );
};
