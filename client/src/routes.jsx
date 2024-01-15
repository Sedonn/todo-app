import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Todo from "./pages/Todo";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    key: "login",
    path: '/',
    element: <Login />
  },
  {
    key: "register",
    path: '/register',
    element: <Register />
  },
  {
    key: 'todo',
    path: '/todo',
    element: <Todo />
  },
]);

export default router;