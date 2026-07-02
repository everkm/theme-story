import { createSignal, createEffect, onCleanup, createMemo } from "solid-js";
import { Portal } from "solid-js/web";
import { HotKeysManager } from "../../widgets/keymap";
import { STORY_PAGE_SWAP } from "../../events";
import FloatSearch, { IApiConfig } from "./FloatSearch";
import IconSearch from "../../../assets/icons/IconSearch.svg";
import { Icon } from "../../../components/Icon";

interface InSearchProps {
  appId: string;
  apiKey: string;
  index: string;
  site?: string;
  onlyButton?: string;
}

export default function InSearch(props: InSearchProps) {
  const [searchVisible, setSearchVisible] = createSignal(false);
  let hotKeysManagerRef: HotKeysManager | null = null;

  const handleToggleSearch = () => {
    setSearchVisible(!searchVisible());
  };

  const handleClose = () => {
    setSearchVisible(false);
  };

  const apiConfig = createMemo<IApiConfig>(() => ({
    appId: props.appId,
    apiKey: props.apiKey,
    index: props.index,
  }));

  createEffect(() => {
    const closeOnNavigate = () => setSearchVisible(false);
    document.addEventListener(STORY_PAGE_SWAP, closeOnNavigate);
    onCleanup(() =>
      document.removeEventListener(STORY_PAGE_SWAP, closeOnNavigate),
    );
  });

  // 注册快捷键
  createEffect(() => {
    if (!hotKeysManagerRef) {
      hotKeysManagerRef = new HotKeysManager();
    }

    const bindings = {
      "Meta-k": () => {
        if (searchVisible()) {
          return false;
        }

        setSearchVisible(true);
        return true;
      },
    };

    hotKeysManagerRef.newSession(bindings);

    onCleanup(() => {
      if (hotKeysManagerRef) {
        hotKeysManagerRef.destroy();
      }
    });
  });

  // 平台相关按键显示
  const cmdKey = createMemo(() => {
    const isMacPlatform =
      typeof navigator !== "undefined" &&
      navigator.platform?.toLowerCase().includes("mac");
    return isMacPlatform ? "⌘" : "^";
  });

  // 是否仅显示按钮
  const justOnlyButton = createMemo(() => {
    return props.onlyButton === "true";
  });

  return (
    <div class="inline-flex items-center">
      <div
        onClick={handleToggleSearch}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggleSearch();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Search"
        class={`focus-outline inline-flex cursor-pointer items-center gap-1.5 rounded-full border py-1 transition-colors ${
          justOnlyButton()
            ? "border-transparent bg-transparent px-0 text-[inherit] hover:text-accent"
            : "border-border bg-muted/60 px-2.5 text-muted-foreground hover:bg-muted hover:text-foreground sm:px-3"
        }`}
      >
        <Icon
          svg={IconSearch}
          class={justOnlyButton() ? "size-6" : "size-4 shrink-0"}
        />

        {!justOnlyButton() && (
          <div class="flex items-center gap-0.5 text-xs tracking-tight">
            <span>{cmdKey()}</span>
            <span>K</span>
          </div>
        )}
      </div>

      <Portal>
        <FloatSearch
          visible={searchVisible()}
          apiConfig={apiConfig()}
          onClose={handleClose}
          site={props.site}
        />
      </Portal>
    </div>
  );
}

// 样式在全局CSS中定义
// .keycode {
//   @apply inline-flex h-8 w-8 items-center justify-center rounded border p-1 text-xs;
// }
