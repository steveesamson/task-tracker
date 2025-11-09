FROM node:20-alpine
ARG SERVER_PORT
RUN echo "Arg SERVER_PORT:${SERVER_PORT}"
ENV PORT=${SERVER_PORT} 
# Create app directory
WORKDIR /backend

# Install app dependencies
COPY package*.json ./

RUN npm install


# Bundle app source
# COPY . .

EXPOSE ${PORT}

CMD [ "npm","start" ]