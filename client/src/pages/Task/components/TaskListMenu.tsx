/** @fileoverview Menu with task operations. */

import { useState } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';

import { Button, Icon } from 'semantic-ui-react';

import SortButton, { TSortButtonProps } from '@/components/SortButton';

import { TTaskSortableKeys } from '@/@types/task';

export type TTaskStatusFilterType = 'completed' | 'uncompleted' | 'all';

type TTaskListMenuProps = WithTranslation & {
  onCreateTask: () => void;
  onFilterByStatusType: (filterType: TTaskStatusFilterType) => void;
  onSortByDate: TSortButtonProps<TTaskSortableKeys>['onSortChanged'];
};

/** Menu with task operations. */
const TaskListMenu = ({
  t,
  onCreateTask,
  onFilterByStatusType,
  onSortByDate,
}: TTaskListMenuProps) => {
  const [filterKey, setFilterKey] = useState<TTaskStatusFilterType>('all');

  const onFilterClick = (key: TTaskStatusFilterType) => {
    const newFilterKey: TTaskStatusFilterType = filterKey === key ? 'all' : key;

    setFilterKey(newFilterKey);
    onFilterByStatusType(newFilterKey);
  };

  return (
    <Button.Group className="flex-wrap">
      <Button onClick={onCreateTask} icon="add" color="green" />
      <SortButton<TTaskSortableKeys>
        title={t('taskPage.menu.sort.createDate')}
        sortKey="createDate"
        onSortChanged={onSortByDate}
      />
      <SortButton<TTaskSortableKeys>
        title={t('taskPage.menu.sort.completeDate')}
        sortKey="completeDate"
        onSortChanged={onSortByDate}
      />
      <Button
        color={filterKey === 'completed' ? 'blue' : undefined}
        onClick={() => onFilterClick('completed')}
        icon
      >
        <Icon className="!ml-1" name="filter" />
        {t('taskPage.menu.filter.onlyCompleted')}
      </Button>
      <Button
        color={filterKey === 'uncompleted' ? 'blue' : undefined}
        onClick={() => onFilterClick('uncompleted')}
        icon
      >
        <Icon className="!ml-1" name="filter" />
        {t('taskPage.menu.filter.onlyUncompleted')}
      </Button>
    </Button.Group>
  );
};

export default withTranslation()(TaskListMenu);
