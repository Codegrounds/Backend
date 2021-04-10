FROM node:14 as development
WORKDIR /app

COPY . .
EXPOSE 80
ENTRYPOINT [ "yarn", "development" ]

FROM node:14 as production
WORKDIR /app

COPY . .
RUN yarn build
RUN rm -rf ./src
RUN rm -rf ./tsconfig.json

EXPOSE 80
ENTRYPOINT [ "yarn", "production" ]
