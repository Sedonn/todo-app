import { createBrowserRouter } from 'react-router-dom';

import Login from '@/pages/Login';
import Task from '@/pages/Task';
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
        path: '/task',
        element: (
          <RequireAuthorization>
            <Task />
          </RequireAuthorization>
        ),
      },
    ],
  },
]);

export default router;
