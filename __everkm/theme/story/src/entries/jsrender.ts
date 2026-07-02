// JSRender 入口：供 everkm-publish 调用
import { renderPage } from "../pages";

function ping() {
  return "pong";
}

function renderDcard() {
  return "";
}

export { ping, renderPage, renderDcard };
