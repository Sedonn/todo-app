import { createContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer, Zoom, toast } from 'react-toastify';

import router from '@/routes';
import UserStore from '@/store/user';

// eslint-disable-next-line react-refresh/only-export-components
export const userStore = new UserStore();

export const UserStoreContext = createContext<UserStore>(userStore);

const App = () => (
  <UserStoreContext.Provider value={userStore}>
    <RouterProvider router={router} />
    <ToastContainer
      autoClose={4000}
      transition={Zoom}
      theme="colored"
      position={toast.POSITION.TOP_RIGHT}
    />
  </UserStoreContext.Provider>
);

export default App;
