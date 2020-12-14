# pull official base image
FROM node:12

# set working directory
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build
# add app
#COPY . ./

# start app
CMD ["npm", "start"]