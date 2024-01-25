import { Router } from 'express';

import { createTask, deleteTask, getTasks, updateTask } from '@/Controllers/task.ts';

const router = Router();

router.get('/', getTasks);
router.post('/', createTask);
router.put('/', updateTask);
router.delete('/', deleteTask);

export default router;
