import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/login'
import ProductsPage from '../pages/products'
import Dashboard from '../pages/dashboard'
import AppLayout from '../layouts/app-layout'
import CreatePage from '../pages/products/create-page'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/products/create',
        element: <CreatePage />,
      },
    ],
  },
])
