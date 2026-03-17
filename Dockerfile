# ---------- BUILDER ---------
FROM node:20-slim AS builder

# work directory
WORKDIR /app
RUN apt-get update && apt-get install -y openssl
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
# copy install dependence
COPY package*.json ./
COPY prisma ./prisma

# install package tools
RUN npm install --legacy-peer-deps 
RUN rm -rf /root/.cache

# copy all src
COPY . .
RUN npx prisma generate
# build app
RUN npm run build

# ---------- RUNNER ---------
FROM gcr.io/distroless/nodejs20-debian13

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next/ ./.next/
COPY --from=builder /app/package.json ./package.json


# expose 3000
EXPOSE 3000

CMD ["npm", "start"]
