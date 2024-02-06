# Todo-app

The web-service for note management created with React.js and Express.js on Typescript.

## Table of Contents

- [Todo-app](#todo-app)
  - [Table of Contents](#table-of-contents)
  - [General info](#general-info)
  - [Technologies](#technologies)
  - [Environment](#environment)
  - [Project Setup](#project-setup)
    - [Development mode](#development-mode)
    - [Production mode](#production-mode)

## General info

This is main docs about web-service for note management - Todo-app.

Frontend part docs is placed [here](https://github.com/Sedonn/todo-app/tree/master/client).

Backend part docs is placed [here](https://github.com/Sedonn/todo-app/tree/master/api).

## Localization

The app uses the i18n library to provide localization. It supports these languages:

- English
- Russian

## Technologies

- Node.js: 20.9.0
- PostgreSQL: 16.1

## Environment

The entire app contains these environment variables:

- `JWT_TOKEN_SECRET` - JWT secret for the API.
- `POSTGRES_PASSWORD` - Password for the DB.

## Project Setup

**The project launch requires Docker**. The Project launch is configured in two modes:

- `development`
- `production`

The `.env.{mode}.example` file must be configured and renamed to `.env.{mode}` before starting the project.

### Development mode

To run the project in the `development` mode run following script `start-development.bat`.

### Production mode

To run the project in the `production` mode run following script `start-production.bat`
