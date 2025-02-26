import { logoutUser } from "@/services/request";

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const loginTime = localStorage.getItem("loginTime");
  if (!token || !loginTime) {
    return false;
  }

  // Vérifier si plus d'1h s'est écoulée (3600 secondes)
  const currentTime = Math.floor(Date.now() / 1000); // Temps actuel en secondes
  const timeElapsed = currentTime - parseInt(loginTime, 10);

  if (timeElapsed > 3600) {
    logoutUser();
    return false;
  }

  return true;
};

