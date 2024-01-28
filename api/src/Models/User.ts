/* eslint-disable @typescript-eslint/indent */

import { Column, Entity, OneToMany, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { Task } from './Task.ts';

import type { TUser } from '@/@types/user.d.ts';

@Entity()
export class User implements TUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  login!: string;

  @Column('varchar')
  password!: string;

  @OneToMany(() => Task, (task: Task) => task.user)
  tasks!: Relation<Task[]>;
}
