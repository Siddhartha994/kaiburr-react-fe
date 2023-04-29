# specify the node base image with your desired version node:<version>
FROM node:16
# replace this with your application's default port
EXPOSE 8888

WORKDIR /kaiburrfe
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]

# $ docker build -f Dockerfile -t kaiburrfe .
# docker run --publish 3000:3000 kaiburrfe
# docker-compose up