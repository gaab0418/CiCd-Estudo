# =========================================================
# STAGE 1 "builder": compila o React/Vite pra arquivos estáticos (HTML/JS/CSS puros)
# =========================================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# IMPORTANTE — diferença de frontend pra backend:
# o Vite "assa" (bake) as env VITE_* dentro do JS no momento do BUILD, não do runtime.
# Ou seja: depois de buildado, trocar a env do container NÃO muda mais nada.
# Por isso recebemos isso como ARG (parâmetro de build) e não como ENV de runtime.
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# =========================================================
# STAGE 2 "runner": nginx só pra servir os arquivos estáticos gerados. Imagem final é minúscula.
# =========================================================
FROM nginx:1.27-alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
