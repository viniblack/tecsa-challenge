# 🧩 Tecsa Challenge - Backend

Essa é a API onde você pode fazer o gerenciamento de tarefas, desenvolvida utilizando **PHP com Slim Framework**, conectada a um banco de dados **MySQL**, com configuração facilitada através do **Docker**.

## 📝 Descrição do Projeto

API permite realizar operações CRUD (Create, Read, Update, Delete) em tarefas, cada uma com os seguintes campos:

- `id`: identificador da tarefa
- `title`: título da tarefa
- `description`: descrição opcional
- `status`: pode ser `pendente`, `em andamento` ou `concluída`

## 🚀 Como acessar a API

API estará disponível em:
📍 `http://localhost:9000`

Resposta esperada:

```json
{ "status": "API está no ar!" }
```

## 📁 Estrutura de Pastas

```
backend/
├── public/             # Index.php com Slim
├── sql/schema.sql      # Script SQL para criação da tabela
├── src/                # Código-fonte da aplicação (Controllers, Models, Config)
├── Dockerfile
├── composer.json
├── .env.example

```

## 📬 Endpoints principais

| Método | Rota          | Descrição                     |
| ------ | ------------- | ----------------------------- |
| GET    | `/tasks`      | Lista todas as tarefas        |
| GET    | `/tasks/{id}` | Retorna uma tarefa específica |
| POST   | `/tasks`      | Cria uma nova tarefa          |
| PUT    | `/tasks/{id}` | Atualiza uma tarefa existente |
| DELETE | `/tasks/{id}` | Remove uma tarefa             |

## 🔗 Comunicação com a interface

O backend é consumido pelo frontend localizado em `http://localhost:8080`. Certifique-se de que o frontend está rodando corretamente (veja instruções no [README](../README.md)).