#Creates a layer from node:alpine image.
FROM node:alpine

#Creates directories
RUN mkdir -p /usr/src/learning-backend

#Sets an environment variable
ENV PORT 3001

#Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD commands
WORKDIR /usr/src/learning-backend

#Copy new files or directories into the filesystem of the container
COPY package.json /usr/src/learning-backend
COPY package-lock.json /usr/src/learning-backend

#Execute commands in a new layer on top of the current image and commit the results
RUN npm install

##Copy new files or directories into the filesystem of the container
COPY . /usr/src/learning-backend

#Execute commands in a new layer on top of the current image and commit the results
RUN npm run build

#Informs container runtime that the container listens on the specified network ports at runtime
EXPOSE 3001

#Allows you to configure a container that will run as an executable
ENTRYPOINT ["npm", "run", "start"]