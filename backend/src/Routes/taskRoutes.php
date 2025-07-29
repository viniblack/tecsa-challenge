<?php

use Slim\App;
use App\Controllers\TaskController;

return function (App $app) {
  $controller = new TaskController();

  $app->get('/', function ($request, $response) {
    $response->getBody()->write(json_encode(['status' => 'API está no ar!']));
    return $response;
  });

  $app->get('/tasks', [$controller, 'list']);
  $app->get('/tasks/{id}', [$controller, 'findOne']);
  $app->post('/tasks', [$controller, 'create']);
  $app->put('/tasks/{id}', [$controller, 'update']);
  $app->patch('/tasks/{id}/status', [$controller, 'changeStatus']);
  $app->delete('/tasks/{id}', [$controller, 'delete']);
};
