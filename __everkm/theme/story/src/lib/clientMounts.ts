type MountFn = (el: HTMLElement) => () => void;

const activeMounts = new Map<HTMLElement, () => void>();

const registry: Record<string, MountFn> = {};

export function mountClientBlocks(root: ParentNode = document): void {
  root.querySelectorAll("[data-client-mount]").forEach((node) => {
    const el = node as HTMLElement;
    if (activeMounts.has(el)) return;
    const key = el.getAttribute("data-client-mount");
    if (!key || !registry[key]) return;
    const teardown = registry[key](el);
    activeMounts.set(el, teardown);
  });
}

export function teardownClientMounts(root: ParentNode = document): void {
  root.querySelectorAll("[data-client-mount]").forEach((node) => {
    const el = node as HTMLElement;
    const teardown = activeMounts.get(el);
    if (teardown) {
      teardown();
      activeMounts.delete(el);
    }
  });
}

export function resetMobileNav(): void {
  const menuBtn = document.querySelector<HTMLButtonElement>("#menu-btn");
  const menuItems = document.querySelector("#menu-items");
  if (!menuBtn || !menuItems) return;

  const openLabel = menuBtn.dataset.labelOpen ?? "Open menu";
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", openLabel);
  menuItems.classList.remove("is-open");
}

export function installMobileNav(): void {
  const menuBtn = document.querySelector<HTMLButtonElement>("#menu-btn");
  const menuItems = document.querySelector("#menu-items");

  if (!menuBtn || !menuItems) return;
  if (menuBtn.dataset.bound === "1") return;
  menuBtn.dataset.bound = "1";

  const openLabel = menuBtn.dataset.labelOpen ?? "Open menu";
  const closeLabel = menuBtn.dataset.labelClose ?? "Close menu";

  const closeMenu = () => {
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", openLabel);
    menuItems.classList.remove("is-open");
  };

  menuBtn.addEventListener("click", () => {
    const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
      return;
    }

    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.setAttribute("aria-label", closeLabel);
    menuItems.classList.add("is-open");
  });

  document.addEventListener("click", (event) => {
    if (menuBtn.getAttribute("aria-expanded") !== "true") return;
    const target = event.target as Element | null;
    if (!target) return;
    if (menuBtn.contains(target) || menuItems.contains(target)) return;
    closeMenu();
  });

  menuItems.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });
}
