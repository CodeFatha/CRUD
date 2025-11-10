function validateStudentCreate(data) {
  const { name, surname, email, dob, course_id, gpa } = data;
  if (!name || !surname || !email || !dob || !course_id || gpa === undefined) {
    return 'All fields are required.';
  }

  if (typeof gpa !== 'number' || gpa < 0.0 || gpa > 4.0) {
    return 'GPA must be a number between 0.0 and 4.0.';
  }

  return null;
}

function validateStudentUpdate(data) {
  const { name, surname, email, dob, course_id, gpa } = data;
  if (!name && !surname && !email && !dob && !course_id && gpa === undefined) {
    return 'At least one field is required.';
  }

  if (gpa && (typeof gpa !== 'number' || gpa < 0.0 || gpa > 4.0)) {
    return 'GPA must be a number between 0.0 and 4.0.';
  }

  return null;
}



module.exports = { validateStudentCreate, validateStudentUpdate };