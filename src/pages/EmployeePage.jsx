// src/pages/EmployeePage.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
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

  // Confirm delete handler
  const handleConfirmDelete = () => {
    if (deleteId) removeEmployee(deleteId);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        minHeight: "100vh",
        maxWidth: 1200,
        mx: "auto",
      }}
    >
      {/* Header & Theme Toggle */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h4" mb={{ xs: 2, md: 0 }}>
          Employee Management
        </Typography>
        <Box>
          <Button
            variant="contained"
            onClick={() => setIsDarkMode(!isDarkMode)}
            sx={{ mr: 2, mb: { xs: 1, md: 0 } }}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsModalOpen(true)}
          >
            Add Employee
          </Button>
        </Box>
      </Box>

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Employee Table */}
      <EmployeeTable
        employees={employees}
        loading={loading}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {/* Add/Edit Modal */}
      <EmployeeForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedEmployee={selectedEmployee}
        addEmployee={addEmployee}
        editEmployee={editEmployee}
        actionLoading={actionLoading}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        handleConfirmDelete={handleConfirmDelete}
        actionLoading={actionLoading}
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
