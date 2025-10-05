// src/components/DeleteConfirmDialog.jsx
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";

const DeleteConfirmDialog = ({
  isOpen,
  setIsOpen,
  handleConfirmDelete,
  actionLoading,
  isDarkMode,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
          backgroundColor: isDarkMode ? "#1f1f1f" : "#fff",
          color: isDarkMode ? "#fff" : "#000",
        },
      }}
    >
      <DialogTitle>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg, #FE6B8B, #FF8E53)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Confirm Delete
        </Typography>
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ color: isDarkMode ? "#ddd" : "#555" }}>
          Are you sure you want to delete this employee? This action cannot
          be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
        <Button
          onClick={() => setIsOpen(false)}
          disabled={actionLoading}
          sx={{
            borderRadius: "50px",
            textTransform: "none",
            px: 3,
            backgroundColor: isDarkMode ? "#333" : "#e0e0e0",
            color: isDarkMode ? "#fff" : "#000",
            "&:hover": {
              backgroundColor: isDarkMode ? "#444" : "#d5d5d5",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleConfirmDelete}
          disabled={actionLoading}
          variant="contained"
          sx={{
            borderRadius: "50px",
            textTransform: "none",
            px: 3,
            background: "linear-gradient(90deg, #FE6B8B, #FF8E53)",
            "&:hover": {
              transform: "scale(1.05)",
              background: "linear-gradient(90deg, #FF8E53, #FE6B8B)",
            },
          }}
        >
          {actionLoading ? <CircularProgress size={24} /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
