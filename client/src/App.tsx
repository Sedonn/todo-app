import { createContext } from 'react';
import { RouterProvider } from 'react-router-dom';

import router from '@/routes';
import UserStore from '@/store/user';

// eslint-disable-next-line react-refresh/only-export-components
export const userStore = new UserStore();

export const UserStoreContext = createContext<UserStore>(userStore);

const App = () => (
  <UserStoreContext.Provider value={userStore}>
    <RouterProvider router={router} />
  </UserStoreContext.Provider>
);

export default App;
