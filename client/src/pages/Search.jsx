import { useState } from "react";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Navigation from "../components/Navigation.jsx";
const Search = () => {
  const navigate = useNavigate();

  const [isExpand, setIsExpand] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleToggle = () => {
    if (isExpand) {
      setIsExpand(false);
    }
    if (!isExpand) {
      setIsExpand(true);
    }
  };

  const handleSearch = (input) => {
    if (Object.keys(errors).length > 0) {
      return; // Stop form submission if there are errors
    }
    // Access the input value using input.xx
    let str = "nPerPage=10&page=0&";
    for (const [key, value] of Object.entries(input)) {
      switch (key) {
        case "source":
        case "sourceId":
        case "type":
        case "organism":
        case "validationTechnique":
        case "determinationMethod":
          if (input[key]) {
            str += key + "=" + value + "&";
          }
          break;
        default:
          const isOption = key.includes("_option") ? true : false;
          if (input[key] && !isOption) {
            const optionStr = key + "_option";
            if (input[optionStr] === "<" || input[optionStr] === ">") {
              str += key + "=" + input[optionStr] + value + "&";
            }
            const isMin = key.includes("_min") ? true : false;
            const isMax = key.includes("_max") ? true : false;

            if (isMin) {
              const keyStr = key.split("_")[0];
              str += keyStr + "=" + value + "-";
            }
            if (isMax) {
              str += value + "&";
            }
          }
      }
    }

    navigate(`/search_results?${str}`);
  };

  const rangeFields = [
    { label: "Number of Molecules", field: "molecule" },
    { label: "Length", field: "length" },
    { label: "Number of domains", field: "numOfDomains" },
    { label: "Number of stems", field: "numOfStems" },
    { label: "Number of hairpin loops", field: "numOfHairpinLoops" },
    { label: "Number of internal loops", field: "numOfInternalLoops" },
    { label: "Number of multi-loops", field: "numOfMultiLoops" },
    { label: "Number of pseudoknots", field: "numOfPseudoknots" },
    { label: "Number of bulges", field: "numOfBulges" },
    { label: "Number of exterior loops", field: "numOfExteriorLoops" },
    { label: "Number of segments", field: "numOfSegments" },
    { label: "Number of paired bases", field: "numOfPairedBases" },
    { label: "Number of unpaired bases", field: "numOfUnpairedBases" },
    {
      label: "Number of bands in pseudoknots",
      field: "numOfBandsInPseudoknots",
    },
    { label: "Number of base pairs in bands", field: "numOfBasePairsInBands" },
    { label: "Number of base pairs in stems", field: "numOfBasePairsInStems" },
  ];

  return (
    <>
      <Header />
      <Typography align="center" variant="h6">
        Info: The searching is implemented in case-insensitive and substring
        matching approach.
      </Typography>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          margin: "2rem",
        }}
        onSubmit={handleSubmit(handleSearch)}
      >
        <Container>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              label="Source"
              variant="outlined"
              sx={{ margin: "1rem" }}
              {...register("source")}
            />
            <TextField
              label="Source ID"
              variant="outlined"
              sx={{ margin: "1rem" }}
              {...register("sourceId")}
            />
            <TextField
              label="Type"
              variant="outlined"
              sx={{ margin: "1rem" }}
              {...register("type")}
            />
          </Box>
        </Container>
        <Container>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              label="Organism"
              variant="outlined"
              sx={{ margin: "1rem" }}
              {...register("organism")}
            />
            <TextField
              label="Validation Technique"
              variant="outlined"
              sx={{ margin: "1rem" }}
              {...register("validationTechnique")}
            />
            <TextField
              label="Determination Method"
              variant="outlined"
              sx={{ margin: "1rem" }}
              {...register("determinationMethod")}
            />
          </Box>
        </Container>
        <Container sx={{ display: "flex", justifyContent: "center" }}>
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
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <label>{field.label}</label>
                <select {...register(`${field.field}_option`)}>
                  <option value="<">Less than</option>
                  <option value=">">Greater than</option>
                  <option value="between">Between</option>
                </select>
                {watch(`${field.field}_option`) === "between" ? (
                  <>
                    <input
                      type="number"
                      placeholder="Min"
                      {...register(`${field.field}_min`, {
                        min: {
                          value: 0,
                          message: "Min value cannot be negative",
                        },
                        validate: (value) => {
                          if (watch(`${field.field}_max`) && !value) {
                            return "Min value is required";
                          }
                          if (
                            watch(`${field.field}_option`) === "between" &&
                            value > watch(`${field.field}_max`)
                          ) {
                            return false;
                          }
                          return true;
                        },
                      })}
                    />
                    {errors[`${field.field}_min`] && (
                      <span style={{ color: "red" }}>
                        {errors[`${field.field}_min`].message}
                      </span>
                    )}
                    <input
                      type="number"
                      placeholder="Max"
                      {...register(`${field.field}_max`, {
                        min: {
                          value: 0,
                          message: "Max value cannot be negative",
                        },
                        validate: (value) => {
                          if (watch(`${field.field}_min`) && !value) {
                            return "Max value is required";
                          }
                          if (
                            watch(`${field.field}_option`) === "between" &&
                            value < watch(`${field.field}_min`)
                          ) {
                            return "Max value should be greater than or euqal to Min value";
                          }
                          return true;
                        },
                      })}
                    />
                    {errors[`${field.field}_max`] && (
                      <span style={{ color: "red" }}>
                        {errors[`${field.field}_max`].message}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <input
                      type="number"
                      placeholder="Value"
                      {...register(field.field, {
                        min: {
                          value: 0,
                          message: "Value cannot be negative",
                        },
                      })}
                    />
                    {errors[`${field.field}`] && (
                      <span style={{ color: "red" }}>
                        {errors[`${field.field}`].message}
                      </span>
                    )}
                  </>
                )}
              </div>
            ))}
        </div>
        <Button type="submit" variant="contained">
          Search
        </Button>
      </form>

      <Navigation />
    </>
  );
};

export default Search;
