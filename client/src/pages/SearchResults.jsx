import { useLocation } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import { useEffect } from 'react';
import Header from '../components/Header.jsx';
import Navigation from '../components/Navigation.jsx';
const SearchResults = () => {
  const location = useLocation();
  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    const getData = async () => {
      try {
        let str = '';
        for (const [key, value] of Object.entries(queryParams)) {
          str += key + '=' + value + '&'
        }
        const response = await axios.get(`http://localhost:3000/filter?${str}`);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Header />
      <Navigation />
    </>
  );
};

export default SearchResults;
