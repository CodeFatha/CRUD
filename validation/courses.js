function validateCourseCreate(data) {
  const { code, name, description, level, credits } = data;
  if (!code || !name || !description || !level || !credits === undefined) {
    return 'All fields are required.';
  }

  if (typeof credits !== 'number' || credits < 0) {
    return 'Credits must be a non-negative number.';
  }

  return null;
}

function validateCourseUpdate(data) {
  const { code, name, description, level, credits } = data;
  if (!code && !name && !description && !level && credits === undefined) {
    return 'At least one field is required.';
  }

  if (credits && (typeof credits !== 'number' || credits < 0)) {
    return 'Credits must be a non-negative number.';
  }

  return null;
}


module.exports = { validateCourseCreate, validateCourseUpdate };