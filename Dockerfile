# base image
FROM node:20-slim

# work directory
WORKDIR /app
RUN apt-get update && apt-get install -y openssl
# copy install dependence
COPY package*.json ./
COPY prisma ./prisma

# install package tools
RUN npm install --legacy-peer-deps

# copy all src
COPY . .
RUN npx prisma generate
# build app
RUN npm run build

# expose 3000
EXPOSE 3000

CMD ["npm", "start"]