<?php

namespace App\Models;

use App\Config\Database;
use PDO;

class TaskModel
{
  private PDO $db;

  public function __construct()
  {
    $this->db = Database::getConnection();
  }

  public function all()
  {
    return $this->db->query("SELECT * FROM tasks")->fetchAll();
  }

  public function findById(int $id): ?array
  {
    $stmt = $this->db->prepare("SELECT * FROM tasks WHERE id = :id");
    $stmt->execute([':id' => $id]);
    $task = $stmt->fetch(PDO::FETCH_ASSOC);
    return $task ?: null;
  }

  public function create($data)
  {
    $stmt = $this->db->prepare("INSERT INTO tasks (title, description, status) VALUES (:title, :description, :status)");
    $stmt->execute([
      ':title' => $data['title'],
      ':description' => $data['description'],
      ':status' => $data['status'] ?? 'pendente',
    ]);

    return $this->db->lastInsertId();
  }

  public function update($id, $data)
  {
    $stmt = $this->db->prepare("UPDATE tasks SET title = :title, description = :description WHERE id = :id");
    return $stmt->execute([
      ':id' => $id,
      ':title' => $data['title'],
      ':description' => $data['description'],
    ]);
  }

  public function updateStatus($id, $data)
  {
    $stmt = $this->db->prepare("UPDATE tasks SET status = :status WHERE id = :id");
    return $stmt->execute([
      ':id' => $id,
      ':status' => $data['status'],
    ]);
  }

  public function delete($id)
  {
    $stmt = $this->db->prepare("DELETE FROM tasks WHERE id = :id");
    return $stmt->execute([':id' => $id]);
  }
}
