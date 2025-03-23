# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the frontend
RUN npm run build

# Expose port (change if needed)
EXPOSE 5173

# Serve the built frontend
CMD ["npm", "run", "start"]