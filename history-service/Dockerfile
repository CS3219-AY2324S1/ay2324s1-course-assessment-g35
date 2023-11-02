# Use an official Node.js runtime as the base image
FROM --platform=linux/amd64 node:18

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the source code to the container
COPY . .

# Build the TypeScript code
RUN npm run build
RUN npx prisma generate

# Expose the port your Express app will run on (adjust as needed)
EXPOSE 8000

# Define the command to start your Express app
CMD ["node", "./dist/app.js"]
