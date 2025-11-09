ARG WEB_PORT=6000
FROM node:20-alpine

# Create app directory
WORKDIR /frontend
COPY package*.json ./
COPY ./ ./
RUN npm i
RUN npm i -g serve
RUN npm run build
EXPOSE 6000
CMD ["serve", "-s", "dist", "-l", "6000"]