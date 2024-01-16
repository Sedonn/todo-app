import { PropsWithChildren, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { UserStoreContext } from '@/App';

const RequireAuthorization = observer(({ children }: PropsWithChildren) => {
  const userStore = useContext(UserStoreContext);

  if (!userStore.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
});

export default RequireAuthorization;
