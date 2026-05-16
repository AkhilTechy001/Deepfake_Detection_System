import { createBrowserRouter } from 'react-router';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { DashboardPage } from './components/DashboardPage';
import { NotFoundPage } from './components/NotFoundPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/register',
    Component: RegisterPage,
  },
  {
    path: '/dashboard',
    Component: DashboardPage,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
  {
    path:'/ForgotPasswordPage',
    Component: ForgotPasswordPage,
  },
]);


