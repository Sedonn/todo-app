import axios from "axios";

import { API_URL } from "../config";

const formateTodo = (todo) => ({
  ...todo,
  completed: Boolean(todo.completed),
  createDate: new Date(todo.createDate),
  completeDate: new Date(todo.completeDate)
});

export const getTodos = async () => {
  const response = await axios.get(`${API_URL}/todo/`);
  const todoFormated = response.data.map(formateTodo);

  return todoFormated;
};

export const createTodo = async () => {
  const response = await axios.post(`${API_URL}/todo/`);
  const todoFormated = formateTodo(response.data);

  return todoFormated;
};

export const updateTodoCompletion = async (id, completed) =>
  axios.put(`${API_URL}/todo/status`, { id, completed: Number(completed) });

export const updateTodoContent = async (id, content) =>
  axios.put(`${API_URL}/todo/content`, { id, content });

export const deleteTodo = async (id) =>
  axios.delete(`${API_URL}/todo`, { data: { id } });
