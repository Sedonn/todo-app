/* eslint-disable @typescript-eslint/indent */

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Task from './Task.ts';

import type { TUser } from '@/@types/user.d.ts';

@Entity()
export default class User implements TUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  login!: string;

  @Column('varchar')
  password!: string;

  @OneToMany(() => Task, (task: Task) => task.user)
  tasks!: Task[];
}