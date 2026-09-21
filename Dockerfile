FROM node:22-alpine

WORKDIR /app

# TEST: build roto a proposito para probar el correo de despliegue fallido de DCM.
# Se revierte en el commit siguiente.
RUN exit 1

RUN apk add --no-cache php php-pdo php-pdo_mysql php-mbstring php-openssl

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
