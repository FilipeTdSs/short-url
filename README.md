# Short URL

API para encurtar URLs, feita com **NestJS** e **Redis**. Você envia uma URL longa e recebe um link curto; quem acessa o link curto é redirecionado para a URL original.

## Tecnologias

- **NestJS 12** (TypeScript)
- **Redis 8**, rodando em Docker com a imagem oficial `redis:8-alpine`
- **class-validator** + `ValidationPipe` para validar a entrada
- **nanoid** para gerar os códigos curtos
- **@nestjs/config** para as variáveis de ambiente
- **Swagger** para a documentação da API
- **Vitest** para os testes

## Como rodar

**Pré-requisitos:** Node.js 22.22+ ou 24+ e Docker.

```bash
# 1. Instalar as dependências
npm install

# 2. Criar o arquivo de variáveis de ambiente
cp .env.example .env

# 3. Subir o Redis
docker compose up -d

# 4. Rodar a API em modo de desenvolvimento
npm run start:dev
```

A API sobe em `http://localhost:3000`, e a documentação do Swagger fica em `http://localhost:3000/api`.

### Variáveis de ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `PORT` | Porta da API | `3000` |
| `BASE_URL` | Endereço usado para montar o link curto | `http://localhost:3000` |
| `REDIS_URL` | Endereço de conexão com o Redis | `redis://localhost:6379` |

## Rotas

### Encurtar uma URL

`POST /cutter-url`

```json
{
  "rawUrl": "https://www.google.com/search?q=nestjs"
}
```

Resposta `201 Created`:

```json
{
  "shortUrl": "http://localhost:3000/cutter-url/aB3xY9kLm"
}
```

URL inválida ou sem `http://`/`https://` retorna `400 Bad Request`.

### Acessar o link curto

`GET /cutter-url/:shortUrl`

- `302 Found`: redireciona para a URL original.
- `404 Not Found`: o código não existe.

## Decisões do projeto

- **Redis:** o encurtador só precisa de chave → valor, então um banco relacional seria exagero.
- **`POST` para encurtar:** cada chamada cria um recurso novo, e a URL vai no corpo em vez da query string.
- **`302` em vez de `301`:** o `301` fica em cache no navegador, e o `302` faz todo acesso passar pela API.
- **Validação no DTO:** `@IsUrl()` exige `http` ou `https`. Sem protocolo, o redirecionamento quebraria.
- **Resiliência:** se o Redis cair, a API responde `500` sem cair junto e reconecta sozinha.

## Scripts

| Comando | O que faz |
|---|---|
| `npm run start:dev` | Roda a API com recarregamento automático |
| `npm run build` | Compila para a pasta `dist` |
| `npm run start:prod` | Roda a versão compilada |
| `npm run test` | Roda os testes |
| `npm run lint` | Roda o ESLint |
| `npm run format` | Formata o código com o Prettier |
