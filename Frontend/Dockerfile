# Stage 1: Build the React application
FROM node:16-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Expose port 3000 to the Docker host, so we can access it 
# from the outside.
EXPOSE 3000

# Start nginx and keep the process running
CMD ["npm", "start"]