import { Component, Show } from "solid-js";
import { Icon } from "./Icon";
import IconArrowDown from "../assets/icons/IconArrowDown.svg";
import IconArrowNarrowUp from "../assets/icons/IconArrowNarrowUp.svg";
import IconMoon from "../assets/icons/IconMoon.svg";
import IconSettings from "../assets/icons/IconSettings.svg";
import IconZoomIn from "../assets/icons/IconZoomIn.svg";
import IconZoomOut from "../assets/icons/IconZoomOut.svg";
import { getStoryConfig } from "../lib/config";

type ScrollToolsProps = {
  ctx: PageContext;
};

const toolIconClass = "story-tool-icon size-5";

export const ScrollTools: Component<ScrollToolsProps> = (props) => {
  const cfg = () => getStoryConfig(props.ctx);
  const enabled = () => cfg().story?.global?.scroll_tools?.enable !== false;
  const showBar = () => cfg().story?.global?.scroll_progress?.bar === true;
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
            <li
              class="right-bottom-tools tool-font-adjust-plus"
              title="Increase font size"
            >
              <Icon svg={IconZoomIn} class={toolIconClass} />
            </li>
            <li
              class="right-bottom-tools tool-font-adjust-minus"
              title="Decrease font size"
            >
              <Icon svg={IconZoomOut} class={toolIconClass} />
            </li>
            <Show when={showThemeToggle()}>
              <li
                class="right-bottom-tools tool-dark-light-toggle"
                title="Toggle theme"
              >
                <Icon svg={IconMoon} class={toolIconClass} />
              </li>
            </Show>
            <li
              class="right-bottom-tools tool-scroll-to-bottom"
              title="Scroll to bottom"
            >
              <Icon svg={IconArrowDown} class={toolIconClass} />
            </li>
          </ul>
          <ul class="visible-tools-list">
            <li class="right-bottom-tools toggle-tools-list" title="Tools">
              <Icon
                svg={IconSettings}
                class={`${toolIconClass} toggle-tools-list__icon`}
              />
            </li>
            <li
              class="right-bottom-tools tool-scroll-to-top"
              title="Scroll to top"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={0}
            >
              <span class="tool-scroll-to-top__ring" aria-hidden="true" />
              <Icon
                svg={IconArrowNarrowUp}
                class={`${toolIconClass} tool-scroll-to-top__icon`}
              />
            </li>
          </ul>
        </div>
      </div>
    </Show>
  );
};
