// src/hooks/useEmployees.js
import { useState, useEffect } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/employeeApi";

const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false); // for add/edit/delete
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all employees
  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEmployees();
      setEmployees(data || []);
    } catch (err) {
      setError("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  // Add employee
  const addEmployee = async (employeeData) => {
    setActionLoading(true);
    setError(null);
    try {
      await createEmployee(employeeData);
      await fetchEmployees(); // ✅ refetch all employees after adding
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create employee");

    } finally {
      setActionLoading(false);
    }
  };


  // Edit employee
  const editEmployee = async (id, employeeData) => {
    setActionLoading(true);
    setError(null);
    try {
      await updateEmployee(id, employeeData);
      await fetchEmployees(); // ✅ refetch all employees after edit
      setSelectedEmployee(null);
      setIsModalOpen(false);
    } catch (err) {
      setError("Failed to update employee");
    } finally {
      setActionLoading(false);
    }
  };



  // Delete employee
  const removeEmployee = async (id) => {
    setActionLoading(true);
    setError(null);
    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
      setIsDeleteDialogOpen(false);
      setDeleteId(null);
    } catch (err) {
      setError("Failed to delete employee");
    } finally {
      setActionLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  // Handle delete button click
  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  // Safe filtered employees for search
  const filteredEmployees = employees.filter((emp) => {
    const name = emp.name || "";
    const term = searchTerm || "";
    return name.toLowerCase().includes(term.toLowerCase());
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees: filteredEmployees,
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
    fetchEmployees,
    addEmployee,
    editEmployee,
    removeEmployee,
    handleEdit,
    handleDelete,
  };
};

export default useEmployees;
