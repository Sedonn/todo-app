/* eslint-disable @typescript-eslint/indent */

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, instanceToPlain } from 'class-transformer';

import { User } from './User.ts';

import type { TTask } from '@/@types/task.d.ts';

@Entity()
export class Task implements TTask {
  @PrimaryGeneratedColumn()
  id!: number;

  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => User, (user: User) => user.tasks, { nullable: false })
  user!: number;

  @Column('text', { default: '' })
  content!: string;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;

  @Column('timestamp without time zone', { nullable: true })
  completeDate!: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}
