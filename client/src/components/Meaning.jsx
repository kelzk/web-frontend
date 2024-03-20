import { Typography } from "@mui/material";
const Meaning = ({ header, content }) => {
  return (
    <>
      <hr />
      <Typography variant="h6" sx={{ color: "green" }}>
        {header}
      </Typography>
      <Typography>{content}</Typography>
    </>
  );
};

export default Meaning;
