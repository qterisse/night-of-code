FROM node:24-alpine

WORKDIR /app

# Copy config files
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY eslint.config.js ./

RUN npm install

EXPOSE 5173

# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]