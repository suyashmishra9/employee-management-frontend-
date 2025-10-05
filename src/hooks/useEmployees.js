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

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      setError("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (employeeData) => {
    setActionLoading(true);
    setError(null);
    try {
      const newEmployee = await createEmployee(employeeData);
      setEmployees((prev) => [...prev, newEmployee]);
      setIsModalOpen(false);
    } catch (err) {
      setError("Failed to create employee");
    } finally {
      setActionLoading(false);
    }
  };

  const editEmployee = async (id, employeeData) => {
    setActionLoading(true);
    setError(null);
    try {
      const updated = await updateEmployee(id, employeeData);
      setEmployees((prev) =>
        prev.map((emp) => (emp._id === id ? updated : emp))
      );
      setSelectedEmployee(null);
      setIsModalOpen(false);
    } catch (err) {
      setError("Failed to update employee");
    } finally {
      setActionLoading(false);
    }
  };

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

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees: filteredEmployees,
    loading,
    actionLoading,
    error,
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
