FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy source files
COPY . .

# Expose server port
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]
