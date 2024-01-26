import { DataSource } from 'typeorm';

import { Task } from '@/Models/Task.ts';
import { User } from '@/Models/User.ts';
import {
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
  TYPEORM_LOG,
  TYPEORM_MODELS_SYNC,
} from '@/config.ts';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  synchronize: TYPEORM_MODELS_SYNC,
  logging: TYPEORM_LOG,
  entities: [User, Task],
  subscribers: [],
  migrations: [],
});
