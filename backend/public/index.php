<?php

use Slim\Factory\AppFactory;
use Selective\BasePath\BasePathMiddleware;
use Tuupola\Middleware\CorsMiddleware;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();
$app->addBodyParsingMiddleware();

$app->addRoutingMiddleware();
$app->add(new CorsMiddleware([
  "origin" => ["*"],
  "methods" => ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  "headers.allow" => ["Authorization", "Content-Type", "Accept", "Origin"],
  "headers.expose" => [],
  "credentials" => true,
  "cache" => 0,
]));
$app->add(new BasePathMiddleware($app));

$app->options('/{routes:.+}', function ($request, $response) {
  return $response;
});

(require __DIR__ . '/../src/Routes/taskRoutes.php')($app);

$app->run();
