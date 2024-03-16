import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Search = () => {
  const { register, handleSubmit, watch } = useForm();
  const handleSearch = (input) => {
    // Access the input value using input.xx
    console.log(input.source);
    // Perform search logic using the input value
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
    { label: 'Minimum band length', field: 'minBandLength' },
    { label: 'Average band length', field: 'avgBandLength' },
    { label: 'Maximum band length', field: 'maxBandLength' },
    { label: 'Average bulge length', field: 'avgBulgeLength' },
    { label: 'Average hairpin length', field: 'avgHairpinLength' },
    { label: 'Average stem length', field: 'avgStemLength' },
    { label: 'Internal length', field: 'internalLength' },
    { label: 'Multi length', field: 'multiLength' },
  ];

  return (
    <>
      <div
        style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}
      >
        <Link to="/">Home</Link>
        <span style={{ margin: '0 0.5rem' }}>|</span>
        <Link to="/search">Search</Link>
        <span style={{ margin: '0 0.5rem' }}>|</span>
        <Link to="/help">Help</Link>
      </div>
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
        <div>
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
        </div>

        <div>
          {rangeFields.map((field, index) => (
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
    </>
  );
};

export default Search;
