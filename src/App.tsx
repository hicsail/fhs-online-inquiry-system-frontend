import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { DashboardPage, loader as datasetLoader } from './pages/Dashboard';
import { RootLayout } from './pages/Root';
import { HomePage } from './pages/Home';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'datasets/:dataset', element: <DashboardPage /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
