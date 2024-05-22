import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import AdminPanel from '../pages/AdminPanel';
import AdminProducts from '../pages/AdminProducts';
import ForgotPassword from '../pages/ForgotPassword';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Users from '../pages/Users';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'admin',
        element: <AdminPanel />,
        children: [
          {
            path: 'users',
            element: <Users />,
          },
          {
            path: 'products',
            element: <AdminProducts />,
          },
        ],
      },
    ],
  },
]);

export default router;
