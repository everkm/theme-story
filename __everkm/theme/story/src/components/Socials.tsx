import { Component, For, Show } from "solid-js";
import { Icon } from "./Icon";
import { getSocialIcon } from "../lib/socialIcons";

type SocialsProps = {
  ctx: PageContext;
  socials: { name: string; url: string }[];
};

export const Socials: Component<SocialsProps> = (props) => {
  return (
    <Show when={props.socials.length > 0}>
      <div class="flex flex-wrap items-center gap-4">
        <For each={props.socials}>
          {(item) => {
            const svg = getSocialIcon(item.name);

            return (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                class={
                  svg
                    ? "inline-flex items-center text-accent hover:opacity-80 transition-opacity"
                    : "inline-flex items-center text-accent hover:underline decoration-dashed underline-offset-4"
                }
                title={item.name}
                aria-label={svg ? item.name : undefined}
              >
                {svg ? <Icon svg={svg} class="size-5 block shrink-0" /> : item.name}
              </a>
            );
          }}
        </For>
      </div>
    </Show>
  );
};
