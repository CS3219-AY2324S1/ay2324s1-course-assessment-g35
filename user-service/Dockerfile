FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npx prisma generate
EXPOSE 8000
CMD [ "node", "dist/app.js" ]

