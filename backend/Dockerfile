# Use Node 20 slim version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose port
ENV PORT=8080
EXPOSE 8080

# Default command
# For dev: overridden by docker-compose
# For prod: Render uses this CMD
CMD ["node", "server.js"]

