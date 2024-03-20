import { Typography, Box } from "@mui/material";
import Header from "../components/Header.jsx";
import Navigation from "../components/Navigation.jsx";
import Meaning from "../components/Meaning.jsx";
import meanings from "../texts/help.json";
const Help = () => {
  return (
    <>
      <Header />
      <Typography variant="h5" sx={{ padding: "1rem" }}>
        This page describes the meaning of keywords or phrases used on the RNA
        virus secondary structure database web pages. The purpose is to clarify
        what information should be entered in the search pages, and what
        information is presented in the search and analysis results pages.
      </Typography>
      <Box sx={{ padding: "1rem" }}>
        {meanings.map(({ field, meaning }) => (
          <Meaning header={field} content={meaning} />
        ))}
      </Box>
      <Navigation />
    </>
  );
};

export default Help;
