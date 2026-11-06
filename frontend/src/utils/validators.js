export function validatePassword(password, confirmPassword) {
  if (!password || password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return null;
}
