##
# Dockerfile to build the User Service
##
FROM node:11-alpine
MAINTAINER Francissco Preller <francisco.preller@gmail.com>

# node-gyp needs python
RUN apk add --no-cache make gcc g++ python

## Setup userspace
RUN mkdir -p /app/
WORKDIR /app

# Install `forever` as a global dependency
# Forever is invoked by docker-compose and used only for development
RUN npm install -g forever@0.14.2

# Load the source into the docker image
ADD package.json /app
RUN npm install

# Load the source into the docker image
ADD . /app

# Code quality checks
# RUN npm run lint:error

# These get overridden by docker-compose
EXPOSE 80
ENTRYPOINT ["npm"]
CMD ["run", "start"]
