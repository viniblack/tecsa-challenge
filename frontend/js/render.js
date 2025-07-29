import { editTaskHandler } from "./events.js";
import { updateTaskStatus } from "./api.js";
import { showAlert } from "./dom.js";

export function renderTasks(tasks) {
  const tbody = document.querySelector("#task-table-body");
  tbody.innerHTML = "";

  tasks.forEach((task) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${task.id}</td>
      <td>${task.title}</td>
      <td>${task.description || ""}</td>
      <td>
        <select class="form-select" data-task-id="${task.id}">
          <option value="pendente" ${
            task.status === "pendente" ? "selected" : ""
          }>Pendente</option>
          <option value="em andamento" ${
            task.status === "em andamento" ? "selected" : ""
          }>Em andamento</option>
          <option value="concluída" ${
            task.status === "concluida" ? "selected" : ""
          }>Concluída</option>
        </select>
      </td>
      <td>
        <button class="btn btn-sm btn-warning" data-edit-id="${
          task.id
        }" data-bs-toggle="modal" data-bs-target="#createTaskModal">Editar</button>
        <button class="btn btn-sm btn-danger" data-delete-id="${
          task.id
        }">Excluir</button>
      </td>
    `;

    tbody.appendChild(tr);

    tr.querySelector("select").addEventListener("change", async (e) => {
      const newStatus = e.target.value;
      try {
        const response = await updateTaskStatus(task.id, newStatus);
        if (!response.ok) throw new Error();
      } catch {
        showAlert("Não foi possível atualizar o status da tarefa.", "danger");
      }
    });

    tr.querySelector("[data-edit-id]").addEventListener("click", () =>
      editTaskHandler(task.id)
    );
  });
}
