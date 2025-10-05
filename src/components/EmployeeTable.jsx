// src/components/EmployeeTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EmployeeTable = ({
  employees,
  loading,
  handleEdit,
  handleDelete,
  isDarkMode,
}) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!employees.length) {
    return (
      <Typography
        align="center"
        sx={{ mt: 4, fontWeight: "bold", color: isDarkMode ? "#fff" : "#000" }}
      >
        No employees found.
      </Typography>
    );
  }

  const rowBg = (index) => {
    if (isDarkMode) {
      return index % 2 === 0 ? "#2b2b2b" : "#1f1f1f";
    } else {
      return index % 2 === 0 ? "#f9f9f9" : "#fff";
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 2,
        borderRadius: 3,
        overflowX: "auto", // ✅ allows horizontal scroll on mobile
        boxShadow: isDarkMode
          ? "0 5px 15px rgba(0,0,0,0.5)"
          : "0 5px 15px rgba(0,0,0,0.1)",
        backgroundColor: isDarkMode ? "#1c1c1c" : "#fff",
      }}
    >
      <Table sx={{ minWidth: 650 }}> {/* ✅ minWidth ensures table doesn't shrink too much */}
        <TableHead>
          <TableRow
            sx={{
              background: isDarkMode
                ? "#333"
                : "linear-gradient(90deg, #FF8E53, #FE6B8B)",
            }}
          >
            {["Name", "Email", "Position", "Actions"].map((col) => (
              <TableCell key={col} sx={{ color: "#fff", fontWeight: "bold" }}>
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp, index) => (
            <TableRow
              key={emp._id}
              sx={{
                backgroundColor: index % 2 === 0
                  ? isDarkMode ? "#2b2b2b" : "#f9f9f9"
                  : isDarkMode ? "#1f1f1f" : "#fff",
                "&:hover": {
                  backgroundColor: isDarkMode ? "#3a3a3a" : "#f1f1f1",
                  transform: "scale(1.01)",
                  transition: "all 0.2s ease-in-out",
                  boxShadow: isDarkMode
                    ? "0 4px 10px rgba(255,255,255,0.05)"
                    : "0 4px 10px rgba(0,0,0,0.08)",
                },
              }}
            >
              <TableCell sx={{ color: isDarkMode ? "#fff" : "#000", fontWeight: 500 }}>
                {emp.name}
              </TableCell>
              <TableCell sx={{ color: isDarkMode ? "#ccc" : "#000" }}>{emp.email}</TableCell>
              <TableCell sx={{ color: isDarkMode ? "#ccc" : "#000" }}>{emp.position}</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }} align="center"> {/* ✅ prevents wrapping */}
                <IconButton
                  onClick={() => handleEdit(emp)}
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                      transform: "scale(1.1)",
                    },
                    mr: 1,
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(emp._id)}
                  sx={{
                    backgroundColor: "#d32f2f",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#b71c1c",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
};

export default EmployeeTable;
