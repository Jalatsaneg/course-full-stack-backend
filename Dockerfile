# Dockerfile
FROM node:16

# Set the working directory
WORKDIR /usr/src/app    

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript code
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:dev"] 