<?php

namespace App\Config;

use PDO;
use Dotenv\Dotenv;

class Database
{
  private static ?PDO $connection = null;

  public static function getConnection(): PDO
  {
    if (self::$connection === null) {
      $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
      $dotenv->load();

      $dsn = "mysql:host={$_ENV['DB_HOST']};dbname={$_ENV['DB_DATABASE']};charset=utf8mb4";
      self::$connection = new PDO($dsn, $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      ]);
    }

    return self::$connection;
  }
}
