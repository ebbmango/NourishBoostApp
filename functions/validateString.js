// Receives a string. Returns true if it is valid and false otherwise
// (i.e., if it consists solely of whitespace characters.)

export default function validateString(value) {
  const trimmedValue = value.trim();

  if (trimmedValue === "") {
    return false;
  }

  return true;
}
