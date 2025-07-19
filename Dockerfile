# Dockerfile for fullstack Vite + Node/Express/Stripe app
# --- FRONTEND BUILD ---
FROM node:20 AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
COPY vite.config.js ./
COPY index.html ./
COPY public ./public
COPY src ./src
RUN npm install && npm run build

# --- BACKEND ---
FROM node:20 AS backend
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend .
# Copy frontend build output to backend public folder
COPY --from=frontend /app/dist ./public
COPY backend/.env .env
EXPOSE 5380
CMD ["node", "server.js"]
