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
} from "@mui/material";

const DeleteConfirmDialog = ({
  isOpen,
  setIsOpen,
  handleConfirmDelete,
  actionLoading,
}) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this employee? This action cannot
          be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)} disabled={actionLoading}>
          Cancel
        </Button>
        <Button
          color="error"
          onClick={handleConfirmDelete}
          disabled={actionLoading}
          variant="contained"
        >
          {actionLoading ? <CircularProgress size={24} /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
