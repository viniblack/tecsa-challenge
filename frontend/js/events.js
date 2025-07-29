import {
  fetchAllTasks,
  createTask,
  updateTask,
  deleteTask,
  fetchTaskById,
} from "./api.js";
import { renderTasks } from "./render.js";
import { resetForm, showAlert } from "./dom.js";

export async function fetchAndRenderTasks() {
  const tasks = await fetchAllTasks();
  renderTasks(tasks);
}

export function setupEventListeners() {
  document.querySelector("#task-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.querySelector("#task-id").value;
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const task = { title, description };

    let response;
    if (id) {
      response = await updateTask(id, task);
    } else {
      response = await createTask(task);
    }

    if (response.success) {
      resetForm();
      fetchAndRenderTasks();
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("createTaskModal")
      );
      if (modal) modal.hide();
      showAlert(response.message, "success");
    } else {
      showAlert(response.message, "danger");
    }
  });

  document.querySelector("#open-create-task").addEventListener("click", () => {
    resetForm();
  });

  document.addEventListener("click", async (e) => {
    if (e.target.matches("[data-delete-id]")) {
      const id = e.target.getAttribute("data-delete-id");
      if (confirm("Tem certeza que deseja excluir?")) {
        const response = await deleteTask(id);
        if (response.success) {
          fetchAndRenderTasks();
          showAlert(response.message, "success");
        } else {
          showAlert(response.message, "danger");
        }
      }
    }
  });
}

export async function editTaskHandler(id) {
  const task = await fetchTaskById(id);
  document.querySelector("#task-id").value = task.id;
  document.querySelector("#title").value = task.title;
  document.querySelector("#description").value = task.description;
}
