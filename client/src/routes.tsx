import { createBrowserRouter } from 'react-router-dom';

import Login from '@/pages/Login';
import Todo from '@/pages/Todo';
import Register from '@/pages/Register';

const router = createBrowserRouter([
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
    element: <Todo />,
  },
]);

export default router;
