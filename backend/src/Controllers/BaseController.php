<?php

namespace App\Controllers;

use App\Helpers\ResponseHelper;
use Psr\Http\Message\ResponseInterface as Response;

class BaseController
{
  protected function json(Response $response, int $status, bool $success, string $message = '', $data = null): Response
  {
    return ResponseHelper::json($response, $status, $success, $message, $data);
  }

  protected function sanitize(array $data, array $fields): array
  {
    $cleaned = [];
    foreach ($fields as $field) {
      $cleaned[$field] = trim($data[$field] ?? '');
    }
    return $cleaned;
  }

  protected function validateRequired(array $data, array $requiredFields): ?string
  {
    foreach ($requiredFields as $field) {
      if (empty($data[$field])) {
        return "O campo '{$field}' é obrigatório.";
      }
    }
    return null;
  }
}
