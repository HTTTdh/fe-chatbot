# === Stage 1: Build the React App ===
# Use a specific Node.js version (e.g., 18-alpine)
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
# This caches dependencies and speeds up future builds
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your source code
COPY . .

# Run the build script to create the /app/dist folder
# This will also use your VITE_ build args
RUN npm run build

# === Stage 2: Serve with Nginx ===
# Use the Nginx image you originally had
FROM nginx:alpine

# Copy the built assets from the 'build' stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy your custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]