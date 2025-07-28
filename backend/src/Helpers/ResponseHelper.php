<?php

namespace App\Helpers;

use Psr\Http\Message\ResponseInterface as Response;

class ResponseHelper
{
  public static function json(Response $response, int $status, bool $success, string $message = '', $data = null): Response
  {
    $payload = [
      'success' => $success,
      'message' => $message
    ];

    if (!is_null($data)) {
      $payload['data'] = $data;
    }

    $response->getBody()->write(json_encode($payload));

    return $response
      ->withStatus($status)
      ->withHeader('Content-Type', 'application/json');
  }
}
