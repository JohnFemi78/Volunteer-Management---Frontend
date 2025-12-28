export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function isAdmin() {
  return getUser()?.role === "ADMIN";
}

export function isManager() {
  return getUser()?.role === "MANAGER";
}

export function canDeleteVolunteer() {
  const role = getUser()?.role;
  return role === "ADMIN" || role === "MANAGER";
}
