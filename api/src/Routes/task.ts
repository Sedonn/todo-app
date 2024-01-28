/** @fileoverview Task routes. */

import { Router } from 'express';

import { createTask, deleteTask, getTasks, updateTask } from '@/Controllers/task.ts';

export const taskRouter = Router();

taskRouter.get('/', getTasks);
taskRouter.post('/', createTask);
taskRouter.put('/', updateTask);
taskRouter.delete('/', deleteTask);
