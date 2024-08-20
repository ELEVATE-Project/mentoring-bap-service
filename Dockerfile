# Use Node.js v16 as the base image
FROM node:16-alpine

# Set working directory
WORKDIR /var/src/

# Copy only package.json and package-lock.json to leverage Docker caching for dependencies
COPY ./src/package.json ./src/package-lock.json ./

# Install node packages and cache dependencies
RUN --mount=type=cache,target=/root/.npm \
    npm install --production && npm install -g nodemon@2.0.16

# Copy the rest of the source files into the image
COPY ./src .

# Expose the application port
EXPOSE 3000

# Start the application
CMD [ "node", "app.js" ]
