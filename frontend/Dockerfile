FROM node:20-alpine
ARG WEB_PORT
ARG VITE_API_URL
RUN echo "Args WEB_PORT:${WEB_PORT}, VITE_API_URL:${VITE_API_URL}"
ENV VITE_API_URL=${VITE_API_URL}
ENV WEB_PORT=${WEB_PORT}



# Create app directory
WORKDIR /frontend
COPY package*.json ./

COPY ./ ./

RUN npm install
RUN npm run build

RUN npm i -g serve

EXPOSE ${WEB_PORT}  
CMD sh -c "serve -s ./dist -l $WEB_PORT" 
# CMD  ["serve","-s", "dist", "-l", "${WEB_PORT}"]
