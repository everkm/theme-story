import { Component, Show } from "solid-js";
import { getStoryConfig } from "../lib/config";

type ScrollToolsProps = {
  ctx: PageContext;
};

export const ScrollTools: Component<ScrollToolsProps> = (props) => {
  const cfg = () => getStoryConfig(props.ctx);
  const enabled = () => cfg().story?.global?.scroll_tools?.enable !== false;
  const showBar = () => cfg().story?.global?.scroll_progress?.bar === true;
  const showPercent = () =>
    cfg().story?.global?.scroll_progress?.percentage !== false;
  const showThemeToggle = () => cfg().features?.light_and_dark_mode !== false;

  return (
    <Show when={enabled()}>
      <Show when={showBar()}>
        <div class="progress-bar-container" data-vt-persist>
          <div class="scroll-progress-bar" />
        </div>
      </Show>
      <div class="right-side-tools-container" data-vt-persist>
        <div class="side-tools-container">
          <ul class="hidden-tools-list">
            <Show when={showThemeToggle()}>
              <li
                class="right-bottom-tools tool-dark-light-toggle"
                title="Toggle theme"
              >
                <span aria-hidden="true">◐</span>
              </li>
            </Show>
            <li
              class="right-bottom-tools tool-scroll-to-bottom"
              title="Scroll to bottom"
            >
              <span aria-hidden="true">↓</span>
            </li>
          </ul>
          <ul class="visible-tools-list">
            <li
              class="right-bottom-tools toggle-tools-list"
              title="Tools"
            >
              <span aria-hidden="true">⚙</span>
            </li>
            <Show when={showPercent()}>
              <li
                class="right-bottom-tools tool-scroll-to-top"
                title="Scroll to top"
              >
                <span class="arrow-up" aria-hidden="true">
                  ↑
                </span>
                <span class="percent">0</span>
              </li>
            </Show>
          </ul>
        </div>
      </div>
    </Show>
  );
};
