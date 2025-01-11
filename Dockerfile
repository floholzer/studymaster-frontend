#### Stage 1: Build the Vue.js application ####
FROM node:16-alpine AS BUILD_IMAGE

# Arbeitsverzeichnis im Container festlegen
WORKDIR /app

# Abhängigkeiten kopieren und installieren
COPY package*.json ./
RUN npm install

# Restlichen Quellcode kopieren und die Anwendung bauen
COPY . .

# Build der App
RUN npm run build


#### Stage 2: Serve the application with Nginx ####
FROM nginx:alpine

# Kopiere die gebauten Dateien aus dem vorherigen Stage
COPY --from=BUILD_IMAGE /app/dist /usr/share/nginx/html

# Port 80 freigeben
EXPOSE 80

# Nginx starten
CMD ["nginx", "-g", "daemon off;"]
