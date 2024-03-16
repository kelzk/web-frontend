import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const DefaultPage = () => {
  const { register, handleSubmit, watch } = useForm();
  const handleSearch = (input) => {
    // Access the input value using input.search
    console.log(input.search);
    // Perform search logic using the input value
  };

  // Dummy data for the table
  const virusData = [
    { name: 'Virus 1', field1: 'Value 1', field2: 'Value 2' },
    { name: 'Virus 2', field1: 'Value 3', field2: 'Value 4' },
    { name: 'Virus 3', field1: 'Value 5', field2: 'Value 6' },
  ];

  return (
    <>
      <Typography
        variant="h2"
        align="center"
        sx={{ backgroundColor: '#E3F2FD', padding: '1rem' }}
      >
        RNA viruses secondary structures database
      </Typography>

      <form
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          margin: '3rem',
        }}
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextField
          label="Search"
          variant="outlined"
          {...register('search')} // Register the input for tracking with React Hook Form
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Field 1</TableCell>
              <TableCell>Field 2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {virusData.map((virus) => (
              <TableRow key={virus.name}>
                <TableCell>{virus.name}</TableCell>
                <TableCell>{virus.field1}</TableCell>
                <TableCell>{virus.field2}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DefaultPage;
