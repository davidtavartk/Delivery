import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// layouts
import RootLayout from './layouts/RootLayout';


// pages
import LandingPage from './pages/LandingPage';
import { ROUTES } from './utils/routes';
import ErrorLayout from './layouts/ErrorLayout';


const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    errorElement: <ErrorLayout />,
    children: [
      { index: true, element: <LandingPage /> }
      // { path: "about", element: <About /> },
    ]
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}
export default App;