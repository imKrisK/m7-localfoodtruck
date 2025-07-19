# --- FRONTEND ---
FROM node:20 AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
COPY vite.config.js ./
COPY public ./public
COPY src ./src
RUN npm install && npm run build

# --- BACKEND ---
FROM node:20 AS backend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 5380
CMD ["node", "server.js"]
