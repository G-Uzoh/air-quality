import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import Home from './pages/Home';
import Root from './pages/Root';
import About from './About';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: ':category',
          element: <CategoryPage />,
        },
        {
          path: '/about',
          element: <About />
        }
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
