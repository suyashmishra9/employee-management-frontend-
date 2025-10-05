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
import {
  validateName,
  validateEmail,
  validatePosition,
} from "../utils/validation";

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
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby="employee-form-modal"
      closeAfterTransition
      sx={{ backdropFilter: "blur(4px)" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Typography
          variant="h5"
          mb={3}
          id="employee-form-modal"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg, #FF8E53, #FE6B8B)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
          }}
        >
          {selectedEmployee ? "Edit Employee" : "Add Employee"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            {...register("name", { validate: validateName })}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                backgroundColor: "#f0f0f0",
                "&:hover": { backgroundColor: "#e0e0e0" },
                "&.Mui-focused": {
                  backgroundColor: "#fff",
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                },
              },
            }}
          />

          {/* Email Field */}
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            {...register("email", { validate: validateEmail })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                backgroundColor: "#f0f0f0",
                "&:hover": { backgroundColor: "#e0e0e0" },
                "&.Mui-focused": {
                  backgroundColor: "#fff",
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                },
              },
            }}
          />

          {/* Position Field */}
          <TextField
            fullWidth
            label="Position"
            margin="normal"
            {...register("position", { validate: validatePosition })}
            error={!!errors.position}
            helperText={errors.position?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                backgroundColor: "#f0f0f0",
                "&:hover": { backgroundColor: "#e0e0e0" },
                "&.Mui-focused": {
                  backgroundColor: "#fff",
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                },
              },
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: "50px",
              background: "linear-gradient(90deg, #FE6B8B, #FF8E53)",
              "&:hover": {
                background: "linear-gradient(90deg, #FF8E53, #FE6B8B)",
                transform: "scale(1.03)",
              },
              fontWeight: "bold",
            }}
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
