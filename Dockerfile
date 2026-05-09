FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

RUN cd backend && npm install --legacy-peer-deps
RUN cd frontend && npm install --legacy-peer-deps

COPY . .

RUN cd frontend && npm run build

EXPOSE 5000

CMD ["node", "backend/src/server.js"]