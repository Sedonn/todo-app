import { useCallback, useEffect, useMemo, useState } from "react";

import { Divider, Header, List, Message, Segment } from "semantic-ui-react";

import SiteLayout from "../../layouts/SiteLayout";
import TodoListItem from "./components/TodoListItem";
import TodoListMenu from "./components/TodoListMenu";
import { useNavigate } from "react-router-dom";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodoCompletion,
  updateTodoContent,
} from "../../API/todo";
import { toast } from "react-toastify";

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {boolean} completed Выполнена ли задача.
 * @property {string} content Содержание задачи.
 * @property {Date} createDate Дата создания задачи.
 * @property {Date} completeDate Дата завершения задачи.
 * @property {boolean} editableOnCreate Редактировать ли при создании.
 */

const Todo = () => {
  const [todoData, setTodoData] = useState([]);
  const navigate = useNavigate();

  const defaultTodoDataGetter = (todoList) => todoList;

  const completedTodoDataGetter = (todoList) =>
    todoList.filter(({ completed }) => completed);

  const uncompletedTodoDataGetter = (todoList) =>
    todoList.filter(({ completed }) => !completed);

  const onShowCompleted = (filter) =>
    setTodoDataGetter(() =>
      filter ? completedTodoDataGetter : defaultTodoDataGetter
    );

  const onShowUncompleted = (filter) =>
    setTodoDataGetter(() =>
      filter ? uncompletedTodoDataGetter : defaultTodoDataGetter
    );

  const onSortByDate = (field, sort) => {
    const comparatorConfig = {
      asc: (a, b) => a[field]?.getTime() - b[field]?.getTime(),
      desc: (a, b) => b[field]?.getTime() - a[field]?.getTime(),
    };

    setTodoDataGetter(() =>
      sort !== "none"
        ? (todoList) => [...todoList].sort(comparatorConfig[sort])
        : defaultTodoDataGetter
    );
  };

  const onAddTodo = useCallback(async () => {
    try {
      const newTodoData = await createTodo();

      setTodoData((prevTodoData) => [
        { ...newTodoData, editableOnCreate: true },
        ...prevTodoData,
      ]);
    } catch (error) {
      toast.error(
        error?.response?.data?.error ?? "Ошибка создания новой записи"
      );
    }
  }, []);

  const onCompleteChange = useCallback(async (updateId, checked) => {
    try {
      await updateTodoCompletion(updateId, checked);

      setTodoData((prevState) => {
        const prevTodoData = [...prevState];
        for (const todo of prevTodoData) {
          if (todo.id === updateId) {
            todo.completed = checked;
            todo.completeDate = checked ? new Date() : null;
            break;
          }
        }

        return prevTodoData;
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.error ?? "Ошибка обновления статуса записи"
      );
    }
  }, []);

  const onContentChange = useCallback(async (updateId, content) => {
    try {
      await updateTodoContent(updateId, content);

      setTodoData((prevState) => {
        const prevTodoData = [...prevState];
        for (const todo of prevTodoData) {
          if (todo.id === updateId) {
            todo.content = content;
            todo.editableOnCreate = false;
            break;
          }
        }

        return prevTodoData;
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.error ?? "Ошибка обновления содержания записи"
      );
    }
  }, []);

  const onTodoDelete = useCallback(async (deleteId) => {
    try {
      await deleteTodo(deleteId);
      setTodoData((prevTodoData) =>
        prevTodoData.filter(({ id }) => id !== deleteId)
      );
    } catch (error) {
      toast.error(error?.response?.data?.error ?? "Ошибка удаления записи");
    }
  }, []);

  const [todoDataGetter, setTodoDataGetter] = useState(
    () => defaultTodoDataGetter
  );
  const todoDataFormated = useMemo(
    () => todoDataGetter(todoData),
    [todoData, todoDataGetter]
  );

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/");
    }

    getTodos()
      .then(setTodoData)
      .catch(({ response }) =>
        toast.error(response?.data?.error ?? "Ошибка загрузки списка дел")
      );
  }, []);

  return (
    <SiteLayout>
      <Segment className="!mt-10 w-3/4">
        <Header as="h2">Список дел</Header>
        <Divider />
        <TodoListMenu
          onAddTodo={onAddTodo}
          onShowCompleted={onShowCompleted}
          onShowUncompleted={onShowUncompleted}
          onSortByCreateDate={(sort) => onSortByDate("createDate", sort)}
          onSortByCompleteDate={(sort) => onSortByDate("completeDate", sort)}
        />
        <Divider />
        {todoDataFormated.length !== 0 ? (
          <List relaxed className="max-h-[35rem] !overflow-y-auto">
            {todoDataFormated.map((todo, index) => (
              <TodoListItem
                key={todo.id ?? index}
                todo={todo}
                onCompleteChange={onCompleteChange}
                onContentChange={onContentChange}
                onTodoDelete={onTodoDelete}
              />
            ))}
          </List>
        ) : (
          <Message className="text-center">Список дел пуст</Message>
        )}
      </Segment>
    </SiteLayout>
  );
};

export default Todo;
