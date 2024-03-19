import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Container, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Navigation from '../components/Navigation.jsx';
const Home = () => {
  const [holdings, setHoldings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/holdings');
        setHoldings(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Box sx={{ padding: '1rem' }}>
          <Typography variant="h6">
            This database contains ground-truth RNA virus secondary structures
            of any type and organism. The ultimate goal of this database is to
            incorporate a comprehensive collection of known RNA virus secondary
            structures, and to provide the scientific community with simple ways
            of searching the proposed database.
          </Typography>
        </Box>
      </Container>
      {!isLoading ? (
        <Typography variant="h6" align="center">
          Current holdings:{' '}
          <Link to="/search_results?nPerPage=10&page=0">{holdings}</Link> RNA
          virus secondary structures in total.
        </Typography>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
          }}
        >
          <CircularProgress />
        </div>
      )}
      <Navigation />
    </>
  );
};

export default Home;
