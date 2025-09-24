export const isWeekend = (dateString) => {
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
};

export const validateAppointmentForm = (formData) => {
  const errors = {};

  if (!formData.date) {
    errors.date = "La fecha es obligatoria";
  } else {
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Can't be a past date
    if (selectedDate < today) {
      errors.date =
        "Appointments cannot be scheduled for past dates. Please select today or a future date.";
    } else {
      // Can't be a weekend
      const dayOfWeek = selectedDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        errors.date = "We don't schedule appointments on weekends";
      }
    }
  }

  if (!formData.time) {
    errors.time = "The time is required";
  }

  if (!formData.reason?.trim()) {
    errors.reason = "The reason for your visit is required";
  } else if (formData.reason.trim().length < 10) {
    errors.reason = "The reason must have at least 10 letters";
  }

  if (!formData.doctor) {
    errors.doctor = "Select a doctor is required";
  }

  return errors;
};
