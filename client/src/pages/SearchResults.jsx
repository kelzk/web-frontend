import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  Typography
} from '@mui/material';
import Header from '../components/Header.jsx';
import Navigation from '../components/Navigation.jsx';
const SearchResults = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const urlParams = queryString.parse(location.search);
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(Number(urlParams.page));
  const [rowsPerPage, setRowsPerPage] = useState(Number(urlParams.nPerPage));
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    const getData = async () => {
      setIsLoading(true);
      try {
        queryParams.nPerPage = rowsPerPage
        queryParams.page = page
        let str = '';
        for (const [key, value] of Object.entries(queryParams)) {
          str += key + '=' + value + '&';
        }
        navigate(`/search_results?${str}`)
        const response = await axios.get(`http://localhost:3000/filter?${str}`);
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getData();
  }, [rowsPerPage, page]);

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    const getData = async () => {
      setIsLoading(true);
      try {
        queryParams.nPerPage = rowsPerPage
        let str = '';
        for (const [key, value] of Object.entries(queryParams)) {
          str += key + '=' + value + '&';
        }
        const holdings = await axios.get(`http://localhost:3000/filterRowNum?${str}`);
        setTotalRows(holdings.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset the page number when changing the rows per page
  };

  return (
    <>
      <Header />
      {!isLoading ? (<Typography variant='h6'>Search Results: {totalRows} records found</Typography>) : <CircularProgress />}
      <TableContainer>
        {isLoading ? (
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
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '55%' }}>Name</TableCell>
                <TableCell style={{ width: '30%' }}>Type</TableCell>
                <TableCell style={{ width: '10%' }}>Source</TableCell>
                <TableCell>Source ID</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No results
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell style={{ width: '40%' }}>
                      <Link to={`/details/${row.source}_${row.sourceId}`}>{row.name}</Link>
                    </TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.source}</TableCell>
                    <TableCell>{row.sourceId}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        count={totalRows}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Rows per page"
      />
      <Navigation />
    </>
  );
};

export default SearchResults;
