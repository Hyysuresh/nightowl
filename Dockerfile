# ---------- BUILDER ---------
FROM node:25-bullseye-slim AS builder

# work directory
WORKDIR /app
RUN apt-get update && apt-get install -y openssl
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
# copy install dependence
COPY package*.json ./
COPY prisma ./prisma

# install package tools
RUN npm install --legacy-peer-deps --omit=dev

RUN rm -rf /root/.cache

# copy all src
COPY . .
RUN npx prisma generate
# build app
RUN npm run build
# ---------- RUNNER ----------
FROM node:25-bullseye-slim

WORKDIR /app

RUN npm prune --omit=dev
# only production deps + build output

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next/ ./.next/
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# optional: reduce size more
ENV NODE_ENV=production
# expose 3000
EXPOSE 3000

CMD ["npx","next", "start"]
