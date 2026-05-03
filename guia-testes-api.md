# 📋 Guia de Testes da API – Portfólio Yuri Gonçalves
## Como testar com Postman / Insomnia / Thunder Client

---

## 🚀 Como iniciar o servidor

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o servidor
node server.js

# O servidor sobe em: http://localhost:3000
# O portfólio abre em: http://localhost:3000
```

---

## 📌 BASE URL
```
http://localhost:3000/api
```

---

## 1️⃣ PERFIL  →  `/api/perfil`

### GET – Buscar perfil
```
GET http://localhost:3000/api/perfil
```
**Resposta esperada (200):**
```json
{
  "nome": "Yuri Gonçalves de Souza",
  "subtitulo": "Desenvolvedor de Software Multiplataforma",
  "email": "yurigoncalvesds@gmail.com",
  ...
}
```

---

### PUT – Atualizar perfil
```
PUT http://localhost:3000/api/perfil
Content-Type: application/json

{
  "nome": "Yuri Gonçalves de Souza",
  "subtitulo": "Dev Full-Stack em formação",
  "email": "yurigoncalvesds@gmail.com",
  "whatsapp": "(12) 9 7408-8598",
  "local": "São José dos Campos – SP",
  "bio": "Nova biografia aqui."
}
```

---

## 2️⃣ FORMAÇÕES  →  `/api/formacoes`

### GET – Listar formações
```
GET http://localhost:3000/api/formacoes
```

### POST – Adicionar formação
```
POST http://localhost:3000/api/formacoes
Content-Type: application/json

{
  "tipo": "Técnico",
  "curso": "Técnico em Informática",
  "instituicao": "Escola Exemplo",
  "periodo": "01/2022 – 12/2023"
}
```

### PUT – Atualizar formação (id = 1)
```
PUT http://localhost:3000/api/formacoes/1
Content-Type: application/json

{
  "periodo": "08/2025 – 07/2028 (em andamento)"
}
```

### DELETE – Remover formação (id = 2)
```
DELETE http://localhost:3000/api/formacoes/2
```

---

## 3️⃣ PROJETOS  →  `/api/projetos`

### GET – Listar projetos
```
GET http://localhost:3000/api/projetos
```

### POST – Adicionar projeto
```
POST http://localhost:3000/api/projetos
Content-Type: application/json

{
  "titulo": "Meu Novo Projeto",
  "descricao": "Sistema de gerenciamento de tarefas com autenticação.",
  "tecnologias": ["Node.js", "Express", "MySQL"],
  "link": "https://github.com/Yuri-Dev-OH/meu-projeto",
  "imagem": "img/projeto-novo.png"
}
```

### PUT – Atualizar projeto (id = 1)
```
PUT http://localhost:3000/api/projetos/1
Content-Type: application/json

{
  "descricao": "Descrição atualizada do projeto CodeWave com novos dados do IBGE."
}
```

### DELETE – Remover projeto (id = 1)
```
DELETE http://localhost:3000/api/projetos/1
```

---

## 4️⃣ CURSOS  →  `/api/cursos`

### GET – Listar cursos
```
GET http://localhost:3000/api/cursos
```

### POST – Adicionar curso
```
POST http://localhost:3000/api/cursos
Content-Type: application/json

{
  "titulo": "JavaScript Moderno",
  "entidade": "Alura",
  "horas": 40,
  "ano": 2025,
  "pdf": ""
}
```

### PUT – Atualizar curso (id = 2)
```
PUT http://localhost:3000/api/cursos/2
Content-Type: application/json

{
  "horas": 8,
  "ano": 2025
}
```

### DELETE – Remover curso (id = 3)
```
DELETE http://localhost:3000/api/cursos/3
```

---

## 5️⃣ HARD SKILLS  →  `/api/hardskills`

### GET – Listar hard skills
```
GET http://localhost:3000/api/hardskills
```

### POST – Adicionar hard skill
```
POST http://localhost:3000/api/hardskills
Content-Type: application/json

{
  "nome": "Node.js",
  "icone": "devicon-nodejs-plain",
  "descricao": "Back-end JavaScript com Express e APIs REST."
}
```

### PUT – Atualizar hard skill (id = 1)
```
PUT http://localhost:3000/api/hardskills/1
Content-Type: application/json

{
  "descricao": "Estruturação de páginas web semânticas, acessíveis e responsivas."
}
```

### DELETE – Remover hard skill (id = 6)
```
DELETE http://localhost:3000/api/hardskills/6
```

---

## 6️⃣ SOFT SKILLS  →  `/api/softskills`

### GET – Listar soft skills
```
GET http://localhost:3000/api/softskills
```

### POST – Adicionar soft skill
```
POST http://localhost:3000/api/softskills
Content-Type: application/json

{
  "emoji": "🎯",
  "nome": "Foco e Determinação",
  "descricao": "Comprometimento com metas e prazos estabelecidos."
}
```

### PUT – Atualizar soft skill (id = 1)
```
PUT http://localhost:3000/api/softskills/1
Content-Type: application/json

{
  "descricao": "Experiência com Scrum, sprints e review de entregas em equipe."
}
```

### DELETE – Remover soft skill (id = 5)
```
DELETE http://localhost:3000/api/softskills/5
```

---

## ⚠️ Códigos de Status da API

| Código | Significado                      |
|--------|----------------------------------|
| 200    | OK – Operação realizada          |
| 201    | Created – Recurso criado         |
| 400    | Bad Request – Dados inválidos    |
| 404    | Not Found – ID não encontrado    |

---

## 📁 Estrutura de Pastas

```
portfolio-yuri/
├── server.js           ← API REST (backend)
├── package.json
├── guia-testes-api.md  ← Este arquivo
└── public/             ← Front-end (servido pelo Express)
    ├── index.html
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── script.js
    ├── img/
    │   ├── yuri.png
    │   ├── codewave.png
    │   ├── icons/
    │   │   └── portfolio.png
    │   └── gifs/
    │       ├── morning.gif
    │       └── good-night.gif
    └── arquivos/
        ├── curriculo.pdf
        ├── CERTIFICADO_-_2025-2.pdf
        └── 14502219_certificado_Fgv.pdf
```
