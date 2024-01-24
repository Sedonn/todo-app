/* eslint-disable @typescript-eslint/indent */

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Task from './Task';

import { TUser } from '../@types/user';

@Entity()
export default class User implements TUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @OneToMany(() => Task, (task: Task) => task.user)
  tasks!: Task[];
}
