/** @fileoverview Task list header. */

import { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { Button, Header, Icon } from 'semantic-ui-react';

import { UserStoreContext } from '@/App';

/** Task list header. */
const TaskListHeader = observer(() => {
  const userStore = useContext(UserStoreContext);

  return (
    <div className="flex justify-between pb-3">
      <Header as="h2" className="!m-0 flex items-center">
        Список дел
      </Header>
      <div className="flex items-center gap-2">
        <Icon className="m-0" name="user" circular size="large" />
        <Header as="h2" className="!m-0" content={userStore.login} />
        <Button
          icon="sign-out"
          compact
          size="large"
          onClick={() => userStore.logout()}
        />
      </div>
    </div>
  );
});

export default TaskListHeader;
