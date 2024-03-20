import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import {
  CircularProgress,
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import StructureFeature from '../components/StructureFeature';

const Details = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [source, sourceId] = id.split('_');
  const str = 'source=' + source + '&sourceId=' + sourceId;
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/findOne?${str}`
        );
        setData(response.data[0]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleClick = () => {
    window.open(
      `https://github.com/kelzk/fyp-RNA-dataset-ground-truth/tree/main/rna-virus/${id}`
    );
  };

  return (
    <>
      <Header />
      {!isLoading ? (
        <>
          <Typography align="center">fasta, bpseq, ct, pdb</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" onClick={handleClick}>
              View files and picture
            </Button>
          </Box>
          <Box sx={{ margin: '20px' }} />
          <Typography align="center" variant="h5">
            General features for {source}_{sourceId}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {Object.entries(data).map(([key, value], index) => {
                  if (
                    key !== '_id' &&
                    key !== 'id' &&
                    !key.includes('Stem') &&
                    !key.includes('Bulge') &&
                    !key.includes('Internal') &&
                    !key.includes('Multi') &&
                    !key.includes('Band') &&
                    !key.includes('Hairpin') &&
                    !key.includes('Pseudoknots') &&
                    !key.includes('PseudoKnots')
                  ) {
                    return (
                      <TableRow key={index}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography sx={{ margin: '20px' }} variant="h6" align="center">
            Click on any header below for additional features.
          </Typography>
          <StructureFeature data={data} structure={'Stem'} substring={'Stem'} />
          <StructureFeature
            data={data}
            structure={'Hairpin loop'}
            substring={'Hairpin'}
          />
          <StructureFeature
            data={data}
            structure={'Bulge loop'}
            substring={'Bulge'}
          />
          <StructureFeature
            data={data}
            structure={'Internal loop'}
            substring={'Internal'}
          />
          <StructureFeature
            data={data}
            structure={'Multi-loop'}
            substring={'Multi'}
          />
          <StructureFeature data={data} structure={'Band'} substring={'Band'} />

          {
            // data.numOfPseudoknot can be of value 0
            typeof data.numOfPseudoknots !== 'undefined' ? (
              <StructureFeature
                data={data}
                structure={'Pseudoknot'}
                substring={'Pseudoknot'}
              />
            ) : (
              <StructureFeature
                data={data}
                structure={'Pseudoknot'}
                substring={'PseudoKnot'}
              />
            )
          }
        </>
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

export default Details;
