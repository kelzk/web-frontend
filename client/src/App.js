import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Help from "./pages/Help";
import SearchResults from "./pages/SearchResults";
import Details from "./pages/Details";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/help",
    element: <Help />,
  },
  {
    path: "/search_results",
    element: <SearchResults />,
  },
  {
    path: "/details/:id",
    element: <Details />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
