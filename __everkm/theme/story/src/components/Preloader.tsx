import { Component, Show } from "solid-js";
import { getStoryConfig } from "../lib/config";

type PreloaderProps = {
  ctx: PageContext;
};

export const Preloader: Component<PreloaderProps> = (props) => {
  const cfg = () => getStoryConfig(props.ctx);
  const enabled = () => cfg().features?.preloader === true;
  const message = () =>
    cfg().story?.global?.preloader?.message?.trim() ||
    cfg().site.name ||
    "Story";
  const maxDuration = () =>
    cfg().story?.global?.preloader?.max_duration_ms ?? 5000;

  return (
    <Show when={enabled()}>
      <div
        class="story-preloader"
        data-max-duration={String(maxDuration())}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <h2 class="story-preloader__title">{message()}</h2>
      </div>
    </Show>
  );
};
