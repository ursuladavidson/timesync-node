FROM node:0.10

ENV IP 0.0.0.0
EXPOSE 8000

# FIXME: npm install takes too long. Copy package.json separately, and install
# before copying the rest of the project to use Docker's awesome caching
COPY . /opt/app

WORKDIR /opt/app

RUN npm install

CMD ["npm", "start"]
