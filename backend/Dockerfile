ARG SERVER_PORT=6000
FROM node:20-alpine

# Create app directory
WORKDIR /backend

# Install app dependencies
COPY package*.json ./

RUN npm install


# Bundle app source
# COPY . .
EXPOSE ${SERVER_PORT}
CMD [ "npm","start" ]