FROM node:24-alpine

WORKDIR /app

# Copy config files
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
# COPY postcss.config.js ./
# COPY tailwind.config.js ./

RUN npm install

# COPY src/ ./src/
# COPY public/ ./public/
# COPY index.html ./

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
# CMD ["npm", "start", "--", "--host", "0.0.0.0"]