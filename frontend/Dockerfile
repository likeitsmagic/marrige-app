FROM node:22-alpine as build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем все файлы проекта в рабочую директорию
COPY . .

# Собираем проект
RUN npm run build

# Используем nginx в качестве сервера для статических файлов
FROM nginx:alpine

# Копируем собранные файлы в nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфигурационный файл nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]