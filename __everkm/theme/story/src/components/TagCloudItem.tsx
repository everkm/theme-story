import { Component } from "solid-js";
import { pageUrl } from "../lib/url";

type TagCloudItemProps = {
  ctx: PageContext;
  tag: string;
  count: number;
};

export const TagCloudItem: Component<TagCloudItemProps> = (props) => {
  const href = () =>
    pageUrl(props.ctx.request_id, `/tags/${encodeURIComponent(props.tag)}/index.html`);

  return (
    <li>
      <a href={href()} data-weight={String(props.count)}>
        <span class="tag-cloud-item__hash" aria-hidden="true">
          #
        </span>
        {props.tag}
      </a>
    </li>
  );
};
