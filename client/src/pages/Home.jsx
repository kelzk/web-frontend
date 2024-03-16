import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Navigation from '../components/Navigation.jsx';
const Home = () => {
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
      <Typography variant="h6" align="center">
        Current holdings: <Link>TotalNum</Link> RNA virus secondary structures in total.
      </Typography>
      <Navigation />
    </>
  );
};

export default Home;
