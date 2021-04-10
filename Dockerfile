FROM node:14 as development
WORKDIR /app

COPY . .
RUN mkdir -p /tmp

EXPOSE 80
ENTRYPOINT [ "yarn", "development" ]

FROM node:14 as production
WORKDIR /app

COPY . .
RUN yarn build
RUN rm -rf ./src
RUN rm -rf ./tsconfig.json

RUN mkdir -p /tmp
RUN mkdir -p /apps/src
RUN ln -s ./dist ./src

EXPOSE 80
ENTRYPOINT [ "yarn", "production" ]
