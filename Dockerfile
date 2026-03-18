# ---------- BUILDER ---------
FROM node:20-slim 

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
# expose 3000
EXPOSE 3000

CMD ["npm", "start"]
