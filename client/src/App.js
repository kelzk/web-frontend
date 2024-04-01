import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Help from "./pages/Help";
import SearchResults from "./pages/SearchResults";
import Details from "./pages/Details";

const App = () => {
  const basename = document.querySelector('base')?.getAttribute('href') ?? '/'
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/help" element={<Help />} />
        <Route path="/search_results" element={<SearchResults />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;