// src/components/SearchBar.jsx
import React from "react";
import { TextField, Box } from "@mui/material";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <Box sx={{ mt: 2, mb: 2, width: { xs: "100%", sm: "50%" } }}>
      <TextField
        fullWidth
        label="Search by name"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Box>
  );
};

export default SearchBar;
