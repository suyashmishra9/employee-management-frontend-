export const validateName = (name) => {
  if (!name || name.trim() === "") return "Name is required";
  if (name.trim().length < 2) return "Name must be at least 2 characters";
  return true;
};

export const validateEmail = (email) => {
  if (!email || email.trim() === "") return "Email is required";
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!regex.test(email)) return "Invalid email address";
  return true;
};

export const validatePosition = (position) => {
  if (!position || position.trim() === "") return "Position is required";
  return true;
};
