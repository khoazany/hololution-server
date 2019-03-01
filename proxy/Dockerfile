FROM node:10

COPY package.json package-lock.json ./
RUN npm i

COPY . ./
RUN npm run build

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]
