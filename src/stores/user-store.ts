import { defineStore } from "pinia";
import { type IUser } from "../models";
import { jwtDecode } from "jwt-decode";

interface IUserStore {
  user: IUser | null;
  isAuthenticated: boolean;
  token: string | null;
  setUser: (user: IUser) => void;
  clearUser: () => void;
  checkTokenExpiration: () => void;
  initializeAuth: () => void;
}

export const useUserStore = defineStore("user", {
  state: (): Omit<
    IUserStore,
    "setUser" | "clearUser" | "checkTokenExpiration" | "initializeAuth"
  > => ({
    user: null,
    isAuthenticated: false,
    token: localStorage.getItem("authToken") || null,
  }),
  actions: {
    setUser(user: IUser) {
      this.user = user;
      this.isAuthenticated = true;
      this.token = user?.token;
      localStorage.setItem("authToken", user?.token);
    },
    clearUser() {
      this.user = null;
      this.isAuthenticated = false;
      this.token = null;
      localStorage.removeItem("authToken");
    },
    checkTokenExpiration() {
      if (this.token) {
        try {
          const decodedToken = jwtDecode<{ exp: number }>(this.token);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            this.clearUser();
          }
        } catch (error) {
          console.error("Erreur lors du décodage du token :", error);
          this.clearUser();
        }
      }
    },
    initializeAuth() {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        try {
          // Vérifiez que le token est bien formé avant de le décoder
          const parts = storedToken.split('.');
          if (parts.length !== 3) {
            throw new Error('Invalid token format');
          }

          const decodedToken = jwtDecode<{ exp: number; user: IUser }>(storedToken);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp > currentTime) {
            this.token = storedToken;
            this.user = decodedToken.user;
            this.isAuthenticated = true;
          } else {
            this.clearUser();
          }
        } catch (error) {
          console.error("Erreur lors de l'initialisation du token :", error);
          this.clearUser();
        }
      }
    },
  },
});
