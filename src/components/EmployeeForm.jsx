// src/components/EmployeeForm.jsx
import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const EmployeeForm = ({
  isModalOpen,
  setIsModalOpen,
  selectedEmployee,
  addEmployee,
  editEmployee,
  actionLoading,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Populate form if editing
  useEffect(() => {
    if (selectedEmployee) {
      reset({
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        position: selectedEmployee.position,
      });
    } else {
      reset({ name: "", email: "", position: "" });
    }
  }, [selectedEmployee, reset]);

  const onSubmit = (data) => {
    if (selectedEmployee) {
      editEmployee(selectedEmployee._id, data);
    } else {
      addEmployee(data);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>
          {selectedEmployee ? "Edit Employee" : "Add Employee"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Position"
            margin="normal"
            {...register("position", { required: "Position is required" })}
            error={!!errors.position}
            helperText={errors.position?.message}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={actionLoading}
          >
            {actionLoading ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EmployeeForm;
