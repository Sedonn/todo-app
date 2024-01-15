import { useMemo, useState } from "react";
import { Button, Icon } from "semantic-ui-react";

/**
 * @typedef {object} SortButtonProps
 * @property {string} title
 * @property {(sort: "asc" | "desc" | "none") => void} onSortChanged
 */

/** @type {React.FC<SortButtonProps>} */
const SortButton = ({ title, onSortChanged }) => {
  /** @type {[string, React.Dispatch<React.SetStateAction<string>]} */
  const [sort, setSort] = useState("none");

  const onSortChange = () => {
    let currentSort;
    if (sort === "none") {
      currentSort = "asc";
    } else if (sort === "asc") {
      currentSort = "desc";
      setSort("desc");
    } else if (sort === "desc") {
      currentSort = "none";
    }
    onSortChanged(currentSort);
    setSort(currentSort);
  };

  const sortIcon = useMemo(() => {
    const iconConfig = {
      none: "sort",
      desc: "long arrow alternate down",
      asc: "long arrow alternate up",
    };

    return iconConfig[sort];
  }, [sort]);

  return (
    <Button
      onClick={onSortChange}
      size="large"
      icon
      className="!flex !items-center"
    >
      {title}
      <Icon className="!ml-1" name={sortIcon} />
    </Button>
  );
};

/**
 * @typedef {object} TodoListMenuProps
 * @property {() => void} onAddTodo
 * @property {() => void} onSortByCreateDate
 * @property {() => void} onSortByCompleteDate
 * @property {(filter: boolean) => void} onShowCompleted
 * @property {(filter: boolean) => void} onShowUncompleted
 */

/** @type {React.FC<TodoListMenuProps>} */
const TodoListMenu = ({
  onAddTodo,
  onShowCompleted,
  onShowUncompleted,
  onSortByCreateDate,
  onSortByCompleteDate,
}) => {
  const [filterKey, setFilterKey] = useState(null);

  const onFilterClick = (key, filterCallback) => {
    const newFilterKey = filterKey === key ? null : key;
    setFilterKey(newFilterKey);
    filterCallback(Boolean(newFilterKey));
  };

  return (
    <>
      <div>
        <Button.Group>
          <Button onClick={onAddTodo} size="large" icon="add" color="green" />
          <SortButton
            title="Дата создания"
            onSortChanged={onSortByCreateDate}
          />
          <SortButton
            title="Дата выполнения"
            onSortChanged={onSortByCompleteDate}
          />
        </Button.Group>
      </div>
      <div className="mt-2">
        <Button.Group>
          <Button
            color={filterKey === "completed" ? "blue" : undefined}
            onClick={() => onFilterClick("completed", onShowCompleted)}
            icon
            size="large"
          >
            <Icon className="!ml-1" name="filter" />
            Выполненные
          </Button>
          <Button
            color={filterKey === "uncompleted" ? "blue" : undefined}
            onClick={() => onFilterClick("uncompleted", onShowUncompleted)}
            icon
            size="large"
          >
            <Icon className="!ml-1" name="filter" />
            Невыполненные
          </Button>
        </Button.Group>
      </div>
    </>
  );
};

export default TodoListMenu;
