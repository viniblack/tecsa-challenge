const API_URL = "http://localhost:9000/tasks";

document.addEventListener("DOMContentLoaded", () => {
  fetchTasks();

  document.querySelector("#task-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const id = document.querySelector("#task-id").value;
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;

    const task = { title, description };

    if (id) {
      updateTask(id, task);
    } else {
      createTask(task);
    }
  });

  document.querySelector("#open-create-task").addEventListener("click", () => {
    resetForm();
  });
});

function fetchTasks() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => renderTasks(data.data));
}

function renderTasks(tasks) {
  const tbody = document.querySelector("#task-table-body");
  tbody.innerHTML = "";

  tasks.forEach((task) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${task.id}</td>
      <td >${task.title}</td>
      <td>${task.description || ""}</td>
      <td>
        <select
          class="form-select"
          data-task-id="${task.id}"
          name="status-task-id-${task.id}"
        >
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
        <button
          class="btn btn-sm btn-warning"
          onclick="editTask(${task.id})"
          data-bs-toggle="modal"
          data-bs-target="#createTaskModal"
        >Editar</button>
        <button class="btn btn-sm btn-danger" onclick="deleteTask(${
          task.id
        })">Excluir</button>
      </td>
    `;

    tbody.appendChild(tr);

    const select = tr.querySelector("select");
    select.addEventListener("change", async (e) => {
      const newStatus = e.target.value;
      const taskId = e.target.getAttribute("data-task-id");

      try {
        const response = await fetch(`${API_URL}/${taskId}/status`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        });

        if (!response.ok) {
          throw new Error("Erro ao atualizar o status.");
        }
      } catch (error) {
        console.error("Erro ao atualizar status:", error);
        alert("Não foi possível atualizar o status da tarefa.");
      }
    });
  });
}

function createTask(task) {
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.success) {
        resetForm();
        fetchTasks();
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("createTaskModal")
        );
        if (modal) modal.hide();
        showAlert(response.message, "success");
      } else {
        showAlert(response.message, "danger");
      }
    })
    .catch(() => {
      showAlert("Erro ao criar tarefa.", "danger");
    });
}

function updateTask(id, task) {
  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.success) {
        resetForm();
        fetchTasks();
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("createTaskModal")
        );
        if (modal) modal.hide();
        showAlert(response.message, "success");
      } else {
        showAlert(response.message, "danger");
      }
    })
    .catch(() => {
      showAlert("Erro ao atualizar tarefa.", "danger");
    });
}

function deleteTask(id) {
  if (confirm("Tem certeza que deseja excluir?")) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          fetchTasks();
          showAlert(response.message, "success");
        } else {
          showAlert(response.message, "danger");
        }
      })
      .catch(() => {
        showAlert("Erro ao excluir tarefa.", "danger");
      });
  }
}

function toggleStatus(id, currentStatus) {
  const newStatus = currentStatus === "pendente" ? "concluida" : "pendente";
  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus }),
  }).then(() => fetchTasks());
}

function editTask(id) {
  fetch(`${API_URL}/${id}`)
    .then((res) => res.json())
    .then((task) => {
      document.querySelector("#task-id").value = task.data.id;
      document.querySelector("#title").value = task.data.title;
      document.querySelector("#description").value = task.data.description;
    });
}

function resetForm() {
  document.querySelector("#task-id").value = "";
  document.querySelector("#title").value = "";
  document.querySelector("#description").value = "";
}

function showAlert(message, type = "success") {
  const alertContainer = document.getElementById("alert-container");
  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show position-absolute" style="right: 0; top: 1vh;" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
    </div>
  `;

  setTimeout(() => {
    const alert = bootstrap.Alert.getOrCreateInstance(
      alertContainer.querySelector(".alert")
    );
    alert.close();
  }, 4000);
}
