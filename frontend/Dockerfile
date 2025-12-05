FROM node:24-alpine

WORKDIR /app

RUN npm install -g serve

# Copy config files
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY eslint.config.js ./

RUN npm install

EXPOSE 5173

# CMD ["npm", "run", "dev"]
# CMD ["npm", "start"]
CMD ["npm", "run", "serve"]
# CMD ["sh", "-c", "serve -s dist -l tcp://0.0.0.0:$PORT"]