import { DataSource } from 'typeorm';

import Task from './Models/Task';
import User from './Models/User';
import { POSTGRES_DATABASE, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER } from './config';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  synchronize: true,
  logging: true,
  entities: [User, Task],
  subscribers: [],
  migrations: [],
});

export default AppDataSource;
