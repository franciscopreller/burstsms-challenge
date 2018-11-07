FROM node:11
MAINTAINER Francisco Preller <francissco.preller@gmail.com>

WORKDIR /app

# Build the assests
ADD package.json /app

# Note that
RUN npm install && rm -rf ~/.npm && npm cache clear --force
ADD . /app
RUN NODE_ENV=production npm run start:production

# Ports
EXPOSE 80

CMD ["npm", "run", "start:prod"]