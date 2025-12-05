FROM node:24-alpine

WORKDIR /app

# Copy config files
COPY package*.json ./
COPY tsconfig.json ./

COPY src/ ./src

RUN npm install
ENV PROD=FALSE

EXPOSE 3001

# maybe change this
CMD ["npm", "run", "dev"]
# CMD ["npm", "start"]