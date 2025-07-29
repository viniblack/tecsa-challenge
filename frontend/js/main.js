import { fetchAndRenderTasks, setupEventListeners } from "./events.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchAndRenderTasks();
  setupEventListeners();
});
