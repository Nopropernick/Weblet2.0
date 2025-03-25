# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install -g @nestjs/cli
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port (change if needed)
EXPOSE 3000

# Start the backend
CMD ["npm", "run", "start"]