import { apiRequest } from "./helpers.js";

/**
 * Fetch all tasks from the API.
 * @returns {Promise<Array>} List of tasks.
 */
export async function fetchAllTasks() {
  const res = await apiRequest("/tasks");
  return res.data;
}

/**
 * Create a new task.
 * @param {Object} task - Task data to be created.
 * @returns {Promise<Object>} The created task.
 */
export async function createTask(task) {
  return await apiRequest("/tasks", "POST", task);
}

/**
 * Update an existing task by ID.
 * @param {number|string} id - Task ID.
 * @param {Object} task - Updated task data.
 * @returns {Promise<Object>} The updated task.
 */
export async function updateTask(id, task) {
  return await apiRequest(`/tasks/${id}`, "PUT", task);
}

/**
 * Delete a task by ID.
 * @param {number|string} id - Task ID.
 * @returns {Promise<Object>} API response.
 */
export async function deleteTask(id) {
  return await apiRequest(`/tasks/${id}`, "DELETE");
}

/**
 * Fetch a single task by ID.
 * @param {number|string} id - Task ID.
 * @returns {Promise<Object>} Task data.
 */
export async function fetchTaskById(id) {
  const response = await apiRequest(`/tasks/${id}`);
  return response.data;
}

/**
 * Update the status of a task.
 * @param {number|string} id - Task ID.
 * @param {string} status - New status value.
 * @returns {Promise<Object>} API response.
 */
export async function updateTaskStatus(id, status) {
  return await apiRequest(`/tasks/${id}/status`, "PATCH", { status });
}
