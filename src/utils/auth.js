export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function getRole() {
  return getUser()?.role || null;
}

export function isAdmin() {
  return getRole() === "ADMIN";
}

export function isManager() {
  return getRole() === "MANAGER";
}

export function hasRole(...allowedRoles) {
  const role = getRole();
  return role ? allowedRoles.includes(role) : false;
}

export function canDeleteVolunteer() {
  return hasRole("ADMIN", "MANAGER");
}
