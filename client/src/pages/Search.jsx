import { useState } from 'react';
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Container,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Navigation from '../components/Navigation.jsx';
const Search = () => {
  const navigate = useNavigate();

  const [isExpand, setIsExpand] = useState(false);

  const { register, handleSubmit, watch } = useForm();

  const handleToggle = () => {
    if (isExpand) {
      setIsExpand(false);
    }
    if (!isExpand) {
      setIsExpand(true);
    }
  };

  const handleSearch = (input) => {
    // Access the input value using input.xx
    let str = 'nPerPage=10&page=0&';
    for (const [key, value] of Object.entries(input)) {
      switch (key) {
        case 'source':
        case 'sourceId':
        case 'type':
        case 'organism':
        case 'validationTechnique':
        case 'determinationMethod':
          if (input[key]) {
            str += key + '=' + value + '&';
          }
          break;
        default:
          const isOption = key.includes('_option') ? true : false;
          if (input[key] && !isOption) {
            const optionStr = key + '_option';
            if (input[optionStr] === '<' || input[optionStr] === '>') {
              str += key + '=' + input[optionStr] + value + '&';
            }
            const isMin = key.includes('_min') ? true : false
            const isMax = key.includes('_max') ? true : false

            if (isMin) {
              const keyStr = key.split('_')[0]
              str += keyStr + '=' + value + '-';
            }
            if (isMax){
              str += value + '&';
            }
          }
      }
    }

    navigate(`/search_results?${str}`);
  };

  // Dummy data for the table
  const virusData = [
    { name: 'Virus 1', field1: 'Value 1', field2: 'Value 2' },
    { name: 'Virus 2', field1: 'Value 3', field2: 'Value 4' },
    { name: 'Virus 3', field1: 'Value 5', field2: 'Value 6' },
  ];

  const rangeFields = [
    { label: 'Molecule', field: 'molecule' },
    { label: 'Length', field: 'length' },
    { label: 'Number of domains', field: 'numOfDomains' },
    { label: 'Number of stems', field: 'numOfStems' },
    { label: 'Number of hairpin loops', field: 'numOfHairpinLoops' },
    { label: 'Number of interna loops', field: 'numOfInternalLoops' },
    { label: 'Number of multi loops', field: 'numOfMultiLoops' },
    { label: 'Number of pseudoknots', field: 'numOfPseudoknots' },
    { label: 'Number of bulges', field: 'numOfBulges' },
    { label: 'Number of exterior loops', field: 'numOfExteriorLoops' },
    { label: 'Number of segments', field: 'numOfSegments' },
    { label: 'Number of paired bases', field: 'numOfPairedBases' },
    { label: 'Number of unpaired bases', field: 'numOfUnpairedBases' },
    {
      label: 'Number of bands in pseudoknots',
      field: 'numOfBandsInPseudoknots',
    },
    { label: 'Number of base pairs in bands', field: 'numOfBasePairsInBands' },
    { label: 'Number of base pairs in stems', field: 'numOfBasePairsInStems' },
  ];

  return (
    <>
      <Header />

      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          margin: '3rem',
        }}
        onSubmit={handleSubmit(handleSearch)}
      >
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              label="Source"
              variant="outlined"
              sx={{ margin: '1rem' }}
              {...register('source')}
            />
            <TextField
              label="SourceId"
              variant="outlined"
              sx={{ margin: '1rem' }}
              {...register('sourceId')}
            />
            <TextField
              label="Type"
              variant="outlined"
              sx={{ margin: '1rem' }}
              {...register('type')}
            />
          </Box>
        </Container>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              label="Organism"
              variant="outlined"
              sx={{ margin: '1rem' }}
              {...register('organism')}
            />
            <TextField
              label="Validation Technique"
              variant="outlined"
              sx={{ margin: '1rem' }}
              {...register('validationTechnique')}
            />
            <TextField
              label="Determination Method"
              variant="outlined"
              sx={{ margin: '1rem' }}
              {...register('determinationMethod')}
            />
          </Box>
        </Container>
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          {!isExpand && (
            <Button variant="contained" onClick={handleToggle}>
              Expand filter
            </Button>
          )}
          {isExpand && (
            <Button variant="contained" onClick={handleToggle} color="error">
              Collapse filter
            </Button>
          )}
        </Container>
        <div>
          {isExpand &&
            rangeFields.map((field, index) => (
              <div
                key={field.field}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem',
                }}
              >
                <label>{field.label}</label>
                <select {...register(`${field.field}_option`)}>
                  <option value="<">Less than</option>
                  <option value=">">Greater than</option>
                  <option value="between">Between</option>
                </select>
                {watch(`${field.field}_option`) === 'between' ? (
                  <>
                    <input
                      type="number"
                      placeholder="Min"
                      {...register(`${field.field}_min`)}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      {...register(`${field.field}_max`)}
                    />
                  </>
                ) : (
                  <input
                    type="number"
                    placeholder="Value"
                    {...register(field.field)}
                  />
                )}
              </div>
            ))}
        </div>
        <Button type="submit" variant="contained">
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
      <Navigation />
    </>
  );
};

export default Search;
