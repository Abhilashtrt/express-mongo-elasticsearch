
# Nodejs+MongoDB+ElasticSearch with Docker-compose  

 Demo Project for building RESTful APIs and microservices using Node.js, Express, MongoDB and Elasticsearch with docker-compose

# [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
  

## Features
  


- CORS enabled

- Express + MongoDB ([Mongoose](http://mongoosejs.com/))

- Consistent coding styles with [editorconfig](http://editorconfig.org)

- [Docker](https://www.docker.com/) support

- Load environment variables from .env files with [dotenv](https://github.com/rolodato/dotenv-safe)

- Linting with [eslint](http://eslint.org)


  

## Requirements

 

- [Node v7.6+](https://nodejs.org/en/download/current/) or [Docker](https://www.docker.com/)

  

## Getting Started

  

Clone the repo and make it yours:

  

```bash

git clone https://github.com/abhilashshettigar/express-mongo-elasticsearch-1.git

cd express-mongo-elasticsearch-1

```

  

Install dependencies:

  

```bash

npm i

```

  

Set environment variables:

  

```bash

cp .env.example .env

```

  

## Running Locally and Production

  

```bash

npm run start

```
  

## Lint

  

```bash

# lint code with ESLint

npm run lint

  

# try to fix ESLint errors

npm run lint:fix

  

# lint and watch for changes

npm run lint:watch

```



## Docker

  

```bash

# run container locally

npm run docker:start:dev

or

docker-compose -f docker-compose.dev.yml up

  

# run container in production

npm run docker:start:prod

or

docker-compose -f docker-compose.prod.yml up -d

  

# run tests

npm run docker:start:test

or

docker-compose -f docker-compose.test.yml up

```
## Seeder

  

Run seeder script:
if you want to seed data locally you can use below command
```bash

npm run seed
```
Run seeder in docker
```bash
npm run docker:seed
```
