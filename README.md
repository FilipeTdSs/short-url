# 🔗 Short URL

![NestJS](https://img.shields.io/badge/NestJS-12-E0234E?logo=nestjs&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-8-FF4438?logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)

API para encurtar URLs: você envia uma URL longa e recebe um link curto; quem acessa o link curto é redirecionado para a URL original.

## ✨ Funcionalidades

- Encurtamento de URLs com códigos gerados pelo **nanoid**
- Redirecionamento com **`302 Found`** e `404` para código inexistente
- Validação da URL no DTO com **`@IsUrl()`**: exige `http://` ou `https://`
- `ValidationPipe` global que rejeita campos fora do DTO
- Resiliência: se o Redis cair, a API responde `500` sem cair junto e reconecta sozinha
- Documentação interativa com **Swagger** em `/api`

## 🛠️ Stack

| Camada | Tecnologia |
|---|---|
| Framework | NestJS 12 + TypeScript |
| Armazenamento | Redis 8 (imagem oficial `redis:8-alpine`, via Docker Compose) |
| Validação | class-validator / class-transformer |
| Configuração | `@nestjs/config` |
| Testes | Vitest |

## 📁 Estrutura

```
src/
├── cutter-url/
│   ├── dto/                       # validação da entrada (@IsUrl)
│   ├── cutter-url.controller.ts   # rotas de encurtar e redirecionar
│   ├── cutter-url.service.ts      # geração do código e acesso ao Redis
│   └── cutter-url.module.ts
├── app.module.ts                  # ConfigModule global
└── main.ts                        # ValidationPipe global e Swagger
```

## 🚀 Como rodar

**Pré-requisitos:** Node.js 22.22+ ou 24+ e Docker.

```bash
# 1. Instale as dependências
npm install

# 2. Configure o ambiente
cp .env.example .env

# 3. Suba o Redis com Docker
docker compose up -d

# 4. Inicie em modo desenvolvimento
npm run start:dev
```

A API sobe em `http://localhost:3000` e a documentação fica em `http://localhost:3000/api`.

| Variável | Descrição | Exemplo |
|---|---|---|
| `PORT` | Porta da API | `3000` |
| `BASE_URL` | Endereço usado para montar o link curto | `http://localhost:3000` |
| `REDIS_URL` | Endereço de conexão com o Redis | `redis://localhost:6379` |

## 📚 Endpoints

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/cutter-url` | Encurta uma URL e retorna o link curto |
| `GET` | `/cutter-url/:shortUrl` | Redireciona para a URL original |

**Exemplo:**

```jsonc
// POST /cutter-url
{ "rawUrl": "https://www.google.com/search?q=nestjs" }

// 201 Created
{ "shortUrl": "http://localhost:3000/cutter-url/aB3xY9kLm" }
```

URL inválida ou sem `http://`/`https://` retorna `400 Bad Request`.

## 💡 Decisões do projeto

- **Redis:** o encurtador só precisa de chave → valor, então um banco relacional seria exagero.
- **`POST` para encurtar:** cada chamada cria um recurso novo, e a URL vai no corpo em vez da query string.
- **`302` em vez de `301`:** o `301` fica em cache no navegador, e o `302` faz todo acesso passar pela API.
- **Validação no DTO:** sem protocolo, o navegador trataria a URL como caminho relativo e o redirecionamento quebraria.

## 🧪 Scripts

| Comando | O que faz |
|---|---|
| `npm run start:dev` | Roda a API com recarregamento automático |
| `npm run build` | Compila para a pasta `dist` |
| `npm run start:prod` | Roda a versão compilada |
| `npm run test` | Roda os testes |
| `npm run lint` | Roda o ESLint |
| `npm run format` | Formata o código com o Prettier |

## 🗺️ Roadmap

- [x] Encurtar e redirecionar URLs com Redis
- [x] Validação da URL e tratamento da queda do Redis
- [ ] Testes unitários e e2e do fluxo completo
- [ ] Expiração dos links (TTL do Redis)
- [ ] Contador de cliques
- [ ] Rate limiting
- [ ] Deploy

## 👤 Autor

**Filipe Teles** · [LinkedIn](https://www.linkedin.com/in/filipe-teles-476262215/) · [GitHub](https://github.com/FilipeTdSs)
