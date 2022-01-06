FROM node:16-alpine

WORKDIR /app
COPY package*.json .
RUN npm install && rm -rf /var/lib/apt/lists/*
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]