export const validateRegisterForm = (formData) => {
  const errors = {};

  if (formData.name?.trim()) {
    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      errors.name = "Name or Last name must contain only letters";
    } else if (formData.name.trim().length < 3) {
      errors.name = "Name or Last name must have at least 3 letters";
    }
  }

  if (
    formData.email?.trim() &&
    !/^[^\s@]+@[a-zA-Z]+\.[c][o][m]$/.test(formData.email)
  ) {
    errors.email =
      "Email invalid. Format required: usuario@dominio.com (without numbers in the domain)";
  }

  if (!formData.username?.trim()) {
    errors.username = "Username is required";
  }

  if (formData.password?.trim() && formData.password.length < 6) {
    errors.password = "Password must have at least 6 characters";
  }

  if (formData.nDni?.trim() && !/^\d+$/.test(formData.nDni)) {
    errors.nDni = "DNI must contain only numbers";
  }

  if (!formData.birthdate) {
    errors.birthdate = "Birthdate is required";
  }

  return errors;
};
