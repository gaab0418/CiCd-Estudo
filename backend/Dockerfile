# =========================================================
# STAGE 1 "builder": tem o TypeScript, o Nest CLI, tudo que só existe em dev.
# Essa camada é jogada fora no final — não vai pra imagem final.
# =========================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copia só os manifests primeiro. Isso é cache do Docker: se package.json não mudou,
# o `npm ci` não roda de novo no próximo build (economiza minutos em cada deploy).
COPY package*.json ./
RUN npm ci

# Só agora copia o código-fonte (isso sim muda a cada commit)
COPY . .
RUN npm run build

# =========================================================
# STAGE 2 "runner": imagem final, enxuta, só com o necessário pra RODAR.
# Sem TypeScript, sem devDependencies, sem código-fonte .ts.
# =========================================================
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
# --omit=dev: não instala devDependencies (eslint, jest, ts-node, etc.) na imagem final
RUN npm ci --omit=dev

# Copia só o JS já compilado do stage anterior, não o projeto inteiro
COPY --from=builder /app/dist ./dist

# Documentação: a porta real é definida pela env PORT no docker-compose/.env
EXPOSE 3000

CMD ["node", "dist/main"]
