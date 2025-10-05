// src/pages/EmployeePage.jsx
import React from "react";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
  Paper,
  IconButton,
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
        p: { xs: 2, md: 4 },
        minHeight: "100vh",
        maxWidth: 1400,
        mx: "auto",
        backgroundColor: isDarkMode ? "#121212" : "#f5f5f5",
      }}
    >
      {/* Header & Theme Toggle */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 3,
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

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            startIcon={isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedEmployee(null)
              setIsModalOpen(true)
            }
            }
          >
            Add Employee
          </Button>
        </Box>
      </Box>

      {/* Search Bar */}
      <Paper
        elevation={3}
        sx={{ p: 2, mb: 3, borderRadius: 3, backgroundColor: isDarkMode ? "#1d1d1d" : "#fff" }}
      >
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isDarkMode={isDarkMode}
        />

      </Paper>

      {/* Employee Table */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 3,
          backgroundColor: isDarkMode ? "#1d1d1d" : "#fff",
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
