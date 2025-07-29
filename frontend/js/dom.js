/**
 * Reset the task form fields to their default (empty) values.
 * Clears the hidden task ID, title, and description inputs.
 */
export function resetForm() {
  document.querySelector("#task-id").value = "";
  document.querySelector("#title").value = "";
  document.querySelector("#description").value = "";
}

/**
 * Display a temporary Bootstrap alert message.
 *
 * @param {string} message - The alert message to be shown.
 * @param {'success' | 'danger' | 'warning' | 'info'} [type='success'] -
 *        The Bootstrap alert type (determines color/style).
 */
export function showAlert(message, type = "success") {
  const alertContainer = document.getElementById("alert-container");

  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show position-absolute" style="right: 0; top: 1vh;" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;

  // Automatically dismiss the alert after 4 seconds
  setTimeout(() => {
    const alert = bootstrap.Alert.getOrCreateInstance(
      alertContainer.querySelector(".alert")
    );
    alert.close();
  }, 4000);
}
