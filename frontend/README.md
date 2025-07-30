# 🖥️ Tecsa Challenge - Frontend

Este é o frontend da aplicação que consome a API de gerenciamento de tarefas e permite a visualização, criação, edição e remoção de tarefas por meio de uma interface web simples, responsiva e funcional, feita com **HTML**, **CSS**, **JavaScript** e **Bootstrap**.

## 🔍 Funcionalidades

- ✅ Listar tarefas
- ➕ Criar nova tarefa
- ✏️ Editar tarefa existente
- ❌ Deletar tarefa
- 🔄 Atualizar status da tarefa

## 🚀 Como acessar a interface

📍 `http://localhost:8080`

Você verá a interface de gerenciamento de tarefas sendo exibida.

## 🧱 Estrutura de Arquivos

```
frontend/
├── app.js          # Lógica principal em JavaScript para consumir a API
├── index.html      # Interface da aplicação
├── styles.css      # Estilos customizados
├── Dockerfile      # Configuração do container Docker
```

## 🔗 Comunicação com a API

O frontend consome a API REST localizada em `http://localhost:9000`. Certifique-se de que o backend está rodando corretamente (veja instruções no [README](../README.md)).

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- Bootstrap 5
- Docker