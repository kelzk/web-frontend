import React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Typography
        variant="h2"
        align="center"
        sx={{ backgroundColor: '#E3F2FD', padding: '1rem' }}
      >
        RNA viruses secondary structures database
      </Typography>

      <div
        style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}
      >
        <Link to="/">Home</Link>
        <span style={{ margin: '0 0.5rem' }}>|</span>
        <Link to="/search">Search</Link>
        <span style={{ margin: '0 0.5rem' }}>|</span>
        <Link to="/help">Help</Link>
      </div>

      <Typography variant="h3" align="center">
        description
      </Typography>

      <Typography variant="h4" align="center">
        Current holdings: 207 RNA viruses secondary structures in total.
      </Typography>
    </>
  );
};

export default Home;
