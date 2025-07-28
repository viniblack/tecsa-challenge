<?php

use Slim\Factory\AppFactory;
use Selective\BasePath\BasePathMiddleware;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();
$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();
$app->add(new BasePathMiddleware($app));

(require __DIR__ . '/../src/Routes/taskRoutes.php')($app);

$app->run();
