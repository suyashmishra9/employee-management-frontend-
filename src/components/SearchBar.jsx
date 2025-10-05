// src/components/SearchBar.jsx
import React from "react";
import { TextField, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ searchTerm, setSearchTerm, isDarkMode }) => {
  return (
    <Box
      sx={{
        mt: 3,
        mb: 3,
        width: { xs: "100%", sm: "60%", md: "40%" },
        mx: "auto",
      }}
    >
      <TextField
        fullWidth
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: isDarkMode ? "#bbb" : "#555" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "50px",
            backgroundColor: isDarkMode ? "#2c2c2c" : "#f0f0f0",
            color: isDarkMode ? "#fff" : "#000",
            "&:hover": {
              backgroundColor: isDarkMode ? "#3a3a3a" : "#e0e0e0",
            },
            "&.Mui-focused": {
              backgroundColor: isDarkMode ? "#1f1f1f" : "#fff",
              boxShadow: isDarkMode
                ? "0 0 8px rgba(255,255,255,0.2)"
                : "0 0 8px rgba(0,0,0,0.1)",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            input: {
              color: isDarkMode ? "#fff" : "#000",
            },
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
