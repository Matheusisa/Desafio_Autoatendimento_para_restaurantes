# 🍔 Sistema de Autoatendimento para Restaurantes

Projeto fullstack desenvolvido como desafio técnico pessoal por Matheus.  
O sistema permite que clientes façam pedidos de forma autônoma e que a cozinha/admin gerencie esses pedidos em tempo real.

---

## 🎯 Funcionalidades

### Cliente
- Visualizar cardápio
- Adicionar produtos ao carrinho
- Remover itens do carrinho
- Ver total do pedido
- Finalizar pedido e enviar para cozinha

### Cozinha/Admin
- Ver pedidos em tempo real
- Atualizar status: Recebido, Em preparo, Pronto, Entregue
- Gerenciar cardápio (CRUD de produtos)

---

## ⚙️ Tecnologias Utilizadas

### Frontend
- [React.js](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [CORS](https://www.npmjs.com/package/cors)
- [Dotenv](https://www.npmjs.com/package/dotenv)

---

## 🗂️ Estrutura do Projeto

```
autoatendimento/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
├── backend/
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── models/
│       └── server.js
└── README.md
```

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 18+
- npm

### Frontend

```bash
cd frontend
npm install
npm run dev
```
Acesse [http://localhost:5173](http://localhost:5173) no navegador.

### Backend

```bash
cd backend
npm install
npm run dev
```
A API estará disponível em [http://localhost:3000](http://localhost:3000).

---

## 📚 Rotas da API

### Produtos

- `GET /produtos` — Lista todos os produtos
- `POST /produtos` — Cria um novo produto  
  Corpo: `{ nome, preco, imagem }`
- `PUT /produtos/:id` — Atualiza um produto  
  Corpo: `{ nome?, preco?, imagem? }`
- `DELETE /produtos/:id` — Remove um produto

### Pedidos

- `GET /pedidos` — Lista todos os pedidos
- `POST /pedidos` — Cria um novo pedido  
  Corpo: `{ itens: [{ id, nome, preco, qtd, imagem }] }`
- `PUT /pedidos/:id` — Atualiza status do pedido  
  Corpo: `{ status }`

---

## 💻 Telas do Sistema

- **Cliente:** Monta o pedido, adiciona/remove itens e finaliza.
- **Cozinha:** Visualiza pedidos em tempo real e altera status.
- **Admin:** Gerencia produtos do cardápio (CRUD).

---

## 🧪 Status do Projeto

| Dia | Etapa                          | Status       |
|-----|--------------------------------|--------------|
| 1   | Estrutura inicial e wireframe  | ✅ Concluído |
| 2   | Layout da tela de pedido       | ✅ Concluído |
| 3   | Carrinho interativo            | ✅ Concluído |
| 4   | API de produtos                | ✅ Concluído |
| 5   | Integração pedidos/cozinha     | ✅ Concluído |
| 6   | CRUD de produtos (admin)       | ✅ Concluído |

---

## 🤝 Contribuição

Sinta-se à vontade para abrir issues ou pull requests!

---

## ✍️ Autor

**Matheus** — Desenvolvedor Fullstack apaixonado por desafios práticos.
