// src/pages/EmployeePage.jsx
import React from "react";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import SearchBar from "../components/SearchBar";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";
import useEmployees from "../hooks/useEmployees";

const EmployeePage = ({ isDarkMode, setIsDarkMode }) => {
  const {
    employees,
    loading,
    actionLoading,
    error,
    setError,
    isModalOpen,
    setIsModalOpen,
    selectedEmployee,
    setSelectedEmployee,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    deleteId,
    searchTerm,
    setSearchTerm,
    addEmployee,
    editEmployee,
    removeEmployee,
    handleEdit,
    handleDelete,
  } = useEmployees();

  const handleConfirmDelete = () => {
    if (deleteId) removeEmployee(deleteId);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        minHeight: "100vh",
        maxWidth: 1400,
        mx: "auto",
        backgroundColor: isDarkMode ? "#121212" : "#f5f5f5",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(45deg, #FE6B8B, #FF8E53)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Employee Management
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {/* Theme toggle */}
          <Button
            variant="outlined"
            startIcon={isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            onClick={() => setIsDarkMode(!isDarkMode)}
            fullWidth={{ xs: true, sm: false }}
            sx={{
              borderRadius: "50px",
              borderColor: isDarkMode ? "#fff" : "#1976d2",
              color: isDarkMode ? "#fff" : "#1976d2",
              "&:hover": {
                backgroundColor: isDarkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(25,118,210,0.1)",
              },
              fontWeight: "bold",
            }}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </Button>

          {/* Add Employee */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedEmployee(null);
              setIsModalOpen(true);
            }}
            fullWidth={{ xs: true, sm: false }}
            sx={{
              borderRadius: "50px",
              px: 3,
              py: 1.5,
              fontWeight: "bold",
              background: "linear-gradient(90deg, #FE6B8B, #FF8E53)",
              "&:hover": {
                background: "linear-gradient(90deg, #FF8E53, #FE6B8B)",
                transform: "scale(1.03)",
              },
            }}
          >
            Add Employee
          </Button>
        </Box>
      </Box>

      {/* Search */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 3,
          backgroundColor: isDarkMode ? "#1d1d1d" : "#fff",
        }}
      >
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} isDarkMode={isDarkMode} />
      </Paper>

      {/* Employee Table */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 3,
          backgroundColor: isDarkMode ? "#1d1d1d" : "#fff",
          boxShadow: isDarkMode
            ? "0 4px 20px rgba(0,0,0,0.5)"
            : "0 5px 15px rgba(0,0,0,0.1)",
          overflowX: "auto",
        }}
      >
        <EmployeeTable
          employees={employees}
          loading={loading}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          isDarkMode={isDarkMode}
        />
      </Paper>

      {/* Add/Edit Modal */}
      <EmployeeForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedEmployee={selectedEmployee}
        addEmployee={addEmployee}
        editEmployee={editEmployee}
        actionLoading={actionLoading}
        isDarkMode={isDarkMode}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        handleConfirmDelete={handleConfirmDelete}
        actionLoading={actionLoading}
        isDarkMode={isDarkMode}
      />

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmployeePage;
