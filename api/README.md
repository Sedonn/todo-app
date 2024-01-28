# Todo-app - Backend part

Backend part of Todo-app created with Express.js on Typescript.

## Table of Contents

- [Todo-app - Backend part](#todo-app---backend-part)
  - [Table of Contents](#table-of-contents)
  - [Code style](#code-style)
  - [Environment](#environment)
  - [Technologies](#technologies)
    - [Core dependencies](#core-dependencies)
    - [Common dependencies](#common-dependencies)
    - [Development dependencies](#development-dependencies)

## Code style

![Сode style - Airbnb](https://user-images.githubusercontent.com/59235713/189879167-2451932a-746e-43e8-996f-7829eec98c45.svg)

## Environment

The backend part of app contains these environment variables:

- `POSTGRES_HOST` - Postgres connection parameter.
- `POSTGRES_PORT` - Postgres connection parameter.
- `POSTGRES_USER` - Postgres connection parameter.
- `POSTGRES_PASSWORD` - Postgres connection parameter.
- `POSTGRES_DATABASE` - Postgres connection parameter.
- `TYPEORM_LOG` - On/off the output log of the TypeORM.
- `TYPEORM_MODELS_SYNC` - On/off synchronization of the API with DB.
- `PORT` - Port for Express server.
- `JWT_TOKEN_SECRET` - JWT token secret.
- `CORS_ALLOW_ORIGINS` - CORS settings.

## Technologies

### Core dependencies

- express: 4.18.2
- typeorm: 0.3.19
- reflect-metadata: 0.2.1
- pg: 8.11.3

### Common dependencies

- bcrypt: 5.1.1
- jsonwebtoken: 9.0.2
- cors: 2.8.5
- passport-jwt: 4.0.1
- passport: 0.6.0
- class-transformer: 0.5.1
- yn: 5.0.0

### Development dependencies

- @swc/cli: 0.3.0
- @swc/core: 1.3.106
- @swc/plugin-transform-imports: 1.5.114
- @types/bcrypt: 5.0.2
- @types/cors: 2.8.17
- @types/express: 4.17.21
- @types/jsonwebtoken: 8.5.9
- @types/node: 20.11.5
- @types/passport-jwt: 3.0.13
- @typescript-eslint/eslint-plugin: 6.19.1
- @typescript-eslint/parser: 6.19.1
- eslint: 8.56.0
- eslint-config-airbnb-base: 15.0.0
- eslint-config-airbnb-typescript: 17.1.0
- eslint-plugin-import: 2.29.1
- nodemon: 3.0.3
- tsx: 4.7.0
- typescript: 5.3.3
