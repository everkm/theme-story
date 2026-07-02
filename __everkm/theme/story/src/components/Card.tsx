import { Component } from "solid-js";
import { pageUrl } from "../lib/url";
import { toTransitionName } from "../lib/toTransitionName";
import { Datetime } from "./Datetime";

type CardProps = {
  ctx: PageContext;
  post: PostItem;
  variant?: "h2" | "h3";
};

export const Card: Component<CardProps> = (props) => {
  const variant = () => props.variant ?? "h2";
  const href = () => pageUrl(props.ctx.request_id, props.post.url_path);

  const TitleTag = (p: { children: any }) => {
    const style = { "view-transition-name": toTransitionName(props.post.title) };
    if (variant() === "h3") {
      return <h3 style={style}>{p.children}</h3>;
    }
    return <h2 style={style}>{p.children}</h2>;
  };

  return (
    <li class="my-6">
      <a
        href={href()}
        class="text-accent inline-block text-lg font-medium decoration-dashed underline-offset-4 hover:underline focus-visible:no-underline focus-visible:underline-offset-0"
      >
        <TitleTag>{props.post.title}</TitleTag>
      </a>
      <Datetime
        ctx={props.ctx}
        date={props.post.date}
        updatedAt={props.post.updated_at}
      />
      <p>{props.post.summary}</p>
    </li>
  );
};
