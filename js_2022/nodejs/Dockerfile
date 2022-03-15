FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
#CMD [ "node", "server.js" ]

#docker build . -t rebornweb/node
#docker run -ti -p 49160:8080 -v $PWD/:/usr/src/app --name node -d rebornweb/node
#docker start node
#docker exec -ti node bash

#Express install
# npm install express --save
# npm install nodemon --save-dev
# From package json run script start
# npm run start 
