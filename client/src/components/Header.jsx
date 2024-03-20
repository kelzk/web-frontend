import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Navigation from "./Navigation.jsx";
const Header = () => {
  return (
    <>
      <Typography
        variant="h3"
        align="center"
        sx={{ backgroundColor: "#E3F2FD", padding: "1rem" }}
      >
        RNA virus secondary structure database
      </Typography>
      <Navigation />
    </>
  );
};

export default Header;
