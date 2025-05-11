
# 🍔 Sistema de Autoatendimento para Restaurantes

Projeto fullstack desenvolvido como desafio técnico pessoal por Matheus.  
O sistema permite que clientes façam pedidos de forma autônoma e que a cozinha/admin gerencie esses pedidos em tempo real.

---

## 🎯 Funcionalidades

### Cliente
- Visualizar cardápio por categoria
- Adicionar produtos ao carrinho
- Remover itens do carrinho
- Ver total do pedido
- (Em breve) Finalizar pedido e enviar para cozinha

### Cozinha/Admin (em breve)
- Ver pedidos em tempo real
- Atualizar status: Em preparo, Pronto, Entregue
- Gerenciar cardápio (CRUD)

---

## ⚙️ Tecnologias Utilizadas

### Frontend
- React.js
- Vite
- TailwindCSS

### Backend
- Node.js
- Express
- CORS
- Dotenv

---

## 🗂️ Estrutura do Projeto

```
autoatendimento/
├── frontend/
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

## 🧪 Status do Projeto

| Dia | Etapa                      | Status       |
|-----|----------------------------|--------------|
| 1   | Estrutura inicial e wireframe | ✅ Concluído |
| 2   | Layout da tela de pedido       | ✅ Concluído |
| 3   | Carrinho interativo            | ✅ Concluído |
| 4   | API de produtos                | 🔜 Próximo  |

---

## 📦 Como rodar localmente

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

---

## ✍️ Autor

**Matheus** — Desenvolvedor Fullstack apaixonado por desafios práticos.
