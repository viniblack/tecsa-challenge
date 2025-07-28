<?php

namespace App\Controllers;

use App\Helpers\ResponseHelper;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\TaskModel;

class TaskController extends BaseController
{
  private TaskModel $model;

  public function __construct()
  {
    $this->model = new TaskModel();
  }

  public function list(Request $request, Response $response): Response
  {
    $tasks = $this->model->all();

    return $this->json(
      $response,
      200,
      true,
      empty($tasks) ? "Nenhuma task encontrada" : "Todas as tasks",
      $tasks
    );
  }

  public function findOne(Request $request, Response $response, $args): Response
  {
    $task = $this->model->findById($args['id']);

    if (!$task) {
      return $this->json($response, 404, false, "Task não encontrada");
    }

    return $this->json($response, 200, true, "Task encontrada", $task);
  }

  public function create(Request $request, Response $response): Response
  {
    $rawData = $request->getParsedBody();
    $data = $this->sanitize($rawData, ['title', 'description']);

    $error = $this->validateRequired($data, ['title', 'description']);
    if ($error) {
      return $this->json($response, 400, false, $error);
    }

    $id = $this->model->create($data);
    $task = $this->model->findById($id);

    if (!$task) {
      return $this->json($response, 500, false, 'Erro ao buscar a task criada');
    }

    return $this->json($response, 201, true, 'Task criada com sucesso', $task);
  }

  public function update(Request $request, Response $response, $args): Response
  {
    $id = $args['id'];

    $rawData = $request->getParsedBody();
    $data = $this->sanitize($rawData, ['title', 'description', 'status']);

    $error = $this->validateRequired($data, ['title', 'description', 'status']);
    if ($error) {
      return $this->json($response, 400, false, $error);
    }

    $existingTask = $this->model->findById($id);
    if (!$existingTask) {
      return $this->json($response, 404, false, 'Task não encontrada');
    }

    $success = $this->model->update($id, $data);
    if (!$success) {
      return $this->json($response, 500, false, 'Erro ao atualizar a task');
    }

    $task = $this->model->findById($id);
    return $this->json($response, 200, true, 'Task atualizada com sucesso', $task);
  }

  public function delete(Request $request, Response $response, $args): Response
  {
    $id = $args['id'];

    $task = $this->model->findById($id);
    if (!$task) {
      return $this->json($response, 404, false, "Task não encontrada");
    }

    $success = $this->model->delete($id);
    if (!$success) {
      return $this->json($response, 500, false, "Erro ao apagar a task");
    }

    return $this->json($response, 200, true, "Task apagada com sucesso");
  }
}
