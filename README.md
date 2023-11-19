# NestJS CRUD - MySQL

## Description

This is a simple NestJS CRUD application that uses the [NestJS TypeORM](https://docs.nestjs.com/techniques/database) module to connect to a MySQL database. The database is hosted in a docker container. JSON Web Tokens (JWT) are used to allow users to register on your platform and access their accounts securely.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Endpoints

- ### Cats

  - GET - http://localhost:3000/api/v1/cats
  - GET - http://localhost:3000/api/v1/cats/1
  - POST - http://localhost:3000/api/v1/cats
  - PATCH - http://localhost:3000/api/v1/cats/1
  - DELETE - http://localhost:3000/api/v1/cats/1

- ### Breed

  - GET - http://localhost:3000/api/v1/breed
  - POST - http://localhost:3000/api/v1/breed
