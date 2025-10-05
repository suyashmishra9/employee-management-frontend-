// src/components/EmployeeForm.jsx
import React, { useEffect } from "react";
import { Modal, Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { validateName, validateEmail, validatePosition } from "../utils/validation";

const EmployeeForm = ({
  isModalOpen,
  setIsModalOpen,
  selectedEmployee,
  addEmployee,
  editEmployee,
  actionLoading,
  isDarkMode,
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

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
    if (selectedEmployee) editEmployee(selectedEmployee._id, data);
    else addEmployee(data);
  };

  const fieldBg = isDarkMode ? "#2a2a2a" : "#f0f0f0";
  const fieldHover = isDarkMode ? "#3a3a3a" : "#e0e0e0";
  const fieldText = isDarkMode ? "#fff" : "#000";

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
          bgcolor: isDarkMode ? "#1f1f1f" : "background.paper",
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
          {["name", "email", "position"].map((field) => (
            <TextField
              key={field}
              fullWidth
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              margin="normal"
              {...register(field, {
                validate:
                  field === "name"
                    ? validateName
                    : field === "email"
                    ? validateEmail
                    : validatePosition,
              })}
              error={!!errors[field]}
              helperText={errors[field]?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  backgroundColor: fieldBg,
                  color: fieldText,
                  "&:hover": { backgroundColor: fieldHover },
                  "&.Mui-focused": {
                    backgroundColor: isDarkMode ? "#252525" : "#fff",
                    boxShadow: isDarkMode
                      ? "0 0 10px rgba(255,255,255,0.1)"
                      : "0 0 10px rgba(0,0,0,0.1)",
                  },
                  input: { color: fieldText },
                },
                "& .MuiFormHelperText-root": {
                  color: isDarkMode ? "#ff6b6b" : "#d32f2f",
                },
              }}
            />
          ))}

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
