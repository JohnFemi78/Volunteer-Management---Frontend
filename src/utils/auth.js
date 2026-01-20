// utils/auth.js

// Get the user object from localStorage
export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// Get the role of the current user
export function getRole() {
  return getUser()?.role || null;
}

// Check if a user is authenticated (token exists)
export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

// Role checks
export function isAdmin() {
  return getRole() === "ADMIN";
}

export function isManager() {
  return getRole() === "MANAGER";
}

// Generic role checker: pass one or more allowed roles
export function hasRole(...allowedRoles) {
  const role = getRole();
  return role ? allowedRoles.includes(role) : false;
}

// Specific permission example: can delete volunteer
export function canDeleteVolunteer() {
  return hasRole("ADMIN", "MANAGER");
}
