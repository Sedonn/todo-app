/** @fileoverview Task list header. */

import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { WithTranslation, withTranslation } from 'react-i18next';

import { Button, Header, Icon } from 'semantic-ui-react';

import ChangeLanguageButton from '@/components/ChangeLanguageButton.tsx';

import { UserStoreContext } from '@/App';

/** Task list header. */
const TaskListHeader = observer(({ t }: WithTranslation) => {
  const userStore = useContext(UserStoreContext);

  return (
    <div className="flex justify-between pb-3">
      <Header as="h2" className="!m-0 flex items-center">
        {t('taskPage.title')}
      </Header>
      <div className="flex items-center gap-2">
        <ChangeLanguageButton />
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

export default withTranslation()(TaskListHeader);
