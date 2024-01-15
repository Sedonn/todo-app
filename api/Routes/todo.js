import { Router } from 'express';
import { createTodo, deleteTodo, getTodos, updateTodoContent, updateTodoStatus } from '../Controllers/todo.js';

const router = Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/status', updateTodoStatus);
router.put('/content', updateTodoContent);
router.delete('/', deleteTodo);

export default router;