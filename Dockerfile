FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install --force

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]