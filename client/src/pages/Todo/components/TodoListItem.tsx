import { useEffect, useRef, useState } from "react";
import { Button, Checkbox, Input, List, Segment } from "semantic-ui-react";

/**
 * @typedef TodoListItemProps
 * @property {import("..").Todo} todo
 * @property {(id: number, checked: boolean) => void} onCompleteChange
 * @property {(id: number) => void} onTodoDelete
 * @property {(id: number, content: string) => void} onContentChange
 */

/** @type {React.FC<TodoListItemProps>} */
const TodoListItem = ({
  todo,
  onTodoDelete,
  onCompleteChange,
  onContentChange,
}) => {
  const inputRef = useRef();
  const [editable, setEditable] = useState(todo.editableOnCreate);
  const [todoContent, setTodoContent] = useState(todo.content);

  const onBlur = () => {
    setEditable(false);
    onContentChange(todo.id, todoContent);
  };

  const onTodoContentChange = (e, { value }) => setTodoContent(value);

  const onEditButtonClick = () => setEditable(true);

  useEffect(() => {
    if (todo.editableOnCreate) {
      setTimeout(() => inputRef.current.focus());
    }
  }, []);

  return (
    <List.Item>
      <List.Content>
        <Segment className="!text-xl">
          <List.Header className="!flex justify-between !text-base">
            {todo.completed && (
              <p>
                <span className="!text-xl text-green-500">Выполнено: </span>
                {todo.completeDate.toLocaleString()}
              </p>
            )}
            <p className="ml-auto">{todo.createDate.toLocaleString()}</p>
          </List.Header>
          <div className="flex items-center justify-between">
            <div className="flex w-full items-center">
              <Checkbox
                checked={todo.completed}
                onChange={(_, { checked }) =>
                  onCompleteChange(todo.id, checked)
                }
              />

              {editable ? (
                <Input
                  ref={inputRef}
                  value={todoContent}
                  onChange={onTodoContentChange}
                  fluid
                  className="!ml-3 !w-full"
                >
                  <input onBlur={onBlur} />
                </Input>
              ) : (
                <div className="flex w-full max-w-max items-center">
                  <p className="ml-3">{todoContent}</p>
                  <Button
                    onClick={onEditButtonClick}
                    className="!ml-3"
                    circular
                    size="mini"
                    icon="pencil alternate"
                  />
                </div>
              )}
            </div>

            <Button
              onClick={() => onTodoDelete(todo.id)}
              className="!ml-3"
              circular
              icon="close"
              color="red"
            />
          </div>
        </Segment>
      </List.Content>
    </List.Item>
  );
};

export default TodoListItem;
