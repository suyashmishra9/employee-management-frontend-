// 📄 src/api/employeeApi.js
import axios from "axios";

// Base URL of your backend API
const API_URL = "https://employee-management-backend-8ndb.onrender.com/api/employees";

// Axios instance (you can extend this later for headers/interceptors)
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🟢 Get all employees
export const getEmployees = async () => {
  try {
    const res = await api.get("/");
    return res.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

// 🟡 Get employee by ID
export const getEmployeeById = async (id) => {
  try {
    const res = await api.get(`/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw error;
  }
};

// 🔵 Create a new employee
export const createEmployee = async (employeeData) => {
  try {
    const res = await api.post("/", employeeData);
    return res.data;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
};

// 🟠 Update existing employee
export const updateEmployee = async (id, employeeData) => {
  try {
    const res = await api.put(`/${id}`, employeeData);
    return res.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

// 🔴 Delete employee
export const deleteEmployee = async (id) => {
  try {
    const res = await api.delete(`/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};
