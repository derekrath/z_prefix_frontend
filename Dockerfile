FROM node:16-alpine

RUN mkdir -p /src/app

# Make a folder in your image where your app's source code can live
# RUN mkdir -p /src/app

# Tell your container where your app's source code will live
WORKDIR /src/app

# What source code do you want to copy, and where to put it?
COPY . /src/app

COPY package*.json .

# Does your app have any dependencies that should be installed?
RUN npm install

EXPOSE 3000

CMD npm start