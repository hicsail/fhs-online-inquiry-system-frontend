import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { DashboardPage, loader as DatasetLoader } from './pages/Dashboard';
import { RootLayout } from './pages/Root';
import { HomePage } from './pages/Home';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'datasets/:dataset', element: <DashboardPage />, loader: DatasetLoader }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
