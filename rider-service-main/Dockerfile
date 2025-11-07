FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the service port
EXPOSE 5005

# Healthcheck to verify service is running
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -qO- http://localhost:5005/health || exit 1

# Start the application
CMD ["npm", "start"]
