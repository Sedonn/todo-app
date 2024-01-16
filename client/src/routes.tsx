import { createBrowserRouter } from 'react-router-dom';

import Login from '@/pages/Login';
import Todo from '@/pages/Todo';
import Register from '@/pages/Register';

import BaseLayout from '@/layouts/BaseLayout';
import RequireAuthorization from '@/components/RequireAuthorization';

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/todo',
        element: (
          <RequireAuthorization>
            <Todo />
          </RequireAuthorization>
        ),
      },
    ],
  },
]);

export default router;
