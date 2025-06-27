# Use official Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy app source
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
