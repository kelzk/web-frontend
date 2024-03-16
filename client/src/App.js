import axios from 'axios';
import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Help from './pages/Help';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/help',
    element: <Help />,
  },
]);

const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3000');
        console.log(response.data[0].name);
        setData(response.data[0].name);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
