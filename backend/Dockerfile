FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Run migrations
RUN npm run typeorm:migrate

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
