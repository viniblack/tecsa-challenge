# 🚀 Tecsa Challenge

Este projeto faz parte de um teste técnico e consiste em uma aplicação completa para **gerenciamento de tarefas**, com **backend em PHP (Slim Framework)**, banco de dados **MySQL**, e **frontend em HTML, CSS, JavaScript e Bootstrap**. O ambiente é totalmente containerizado com **Docker**.

## 📝 Descrição do Projeto

A aplicação permite criar, listar, editar, atualizar o status e excluir tarefas por meio de uma API REST e uma interface web responsiva.

Cada tarefa possui os seguintes campos:

- `id`: identificador da tarefa
- `title`: título da tarefa
- `description`: descrição opcional
- `status`: `pendente`, `em andamento` ou `concluída`

## 🔍 Funcionalidades

- ✅ Listar tarefas
- ➕ Criar nova tarefa
- ✏️ Editar tarefa existente
- ❌ Deletar tarefa
- 🔄 Atualizar status da tarefa

## 🛠️ Tecnologias Utilizadas

- **Backend**: PHP, Slim Framework, MySQL
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla), Bootstrap 5
- **Infraestrutura**: Docker, Docker Compose

## 🚀 Como rodar o projeto com Docker

### Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Passo a passo

1. **Clone o repositório:**

```bash
git clone https://github.com/viniblack/tecsa-challenge.git
cd tecsa-challenge
cp backend/.env.example backend/.env
```

2. **Defina as variáveis de ambiente:**

```bash
cp backend/.env.example backend/.env
```

2. **Suba os containers:**

```bash
docker compose up --build -d
```

> Isso iniciará os serviços:
>
> * **Backend** (PHP + Slim) em `http://localhost:9000`
> * **Frontend** (interface web) em `http://localhost:8080`
> * **MySQL** com banco `tasks_db`

3. **Verificações rápidas:**

* Acesse a interface:
  📍 `http://localhost:8080`

* Teste a API:
  📍 `http://localhost:9000/`
  Deve retornar:

  ```json
  { "status": "API está no ar!" }
  ```

## 🔗 Comunicação entre os serviços

O frontend consome diretamente a API REST hospedada em `http://localhost:9000`, e está configurado para se comunicar corretamente quando ambos os serviços estão rodando com Docker.

## 🗃️ Banco de Dados

O banco de dados MySQL é criado automaticamente com base no schema localizado em:

```
backend/sql/schema.sql
```

### Credenciais padrão:

* **Host:** `mysql`
* **Porta:** `3306`
* **Usuário:** `root`
* **Senha:** `root`
* **Database:** `tasks_db`

## 📬 Endpoints da API

| Método | Rota          | Descrição                     |
| ------ | ------------- | ----------------------------- |
| GET    | `/tasks`      | Lista todas as tarefas        |
| GET    | `/tasks/{id}` | Retorna uma tarefa específica |
| POST   | `/tasks`      | Cria uma nova tarefa          |
| PUT    | `/tasks/{id}` | Atualiza uma tarefa existente |
| DELETE | `/tasks/{id}` | Remove uma tarefa             |

## 📁 Estrutura do Projeto

```
tecsa-challenge/
├── backend/
│    ├── public/             # Index.php com Slim
│    ├── sql/schema.sql      # Script SQL para criação da tabela
│    ├── src/                # Código-fonte da aplicação (Controllers, Models, Config)
│    ├── Dockerfile
│    ├── composer.json
│    ├── .env.example
│
├── frontend/
│   ├── js/              # JavaScript que consome a API
│   ├── index.html       # Interface web
│   ├── css/             # Estilo personalizado
│   ├── Dockerfile
│
├── docker-compose.yml
```
