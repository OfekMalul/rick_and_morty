FROM node:18.17.0-slim

WORKDIR /app

# copy has two arguments, 1. takes  the json location. 2. The place we want to copy it into our container
COPY package*.json ./

RUN npm install

# At this point we have downloaded all our dependencies. Now we can copy the source code.

COPY . .

ENV PORT 8000

EXPOSE 8000

# command to run the application
CMD ["npm","start"]
