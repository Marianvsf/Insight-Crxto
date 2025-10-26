import { create } from "zustand";
import { getMockUsers, addMockUser } from "../mocks/mockUsers";

const getInitialToken = () => localStorage.getItem("authToken");

export const useAuthStore = create((set) => ({
  token: getInitialToken(),
  isAuthenticated: !!getInitialToken(),
  user: null,

  login: async (email, password) => {
    console.log(`Login con: ${email}`);
    const foundUser = getMockUsers().find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      const fakeToken = "fake-jwt-token-" + foundUser.id + Date.now();
      localStorage.setItem("authToken", fakeToken);
      set({
        token: fakeToken,
        isAuthenticated: true,
        user: {
          email: foundUser.email,
          username: foundUser.username,
          role: foundUser.role,
          id: foundUser.id,
        },
      });

      console.log(`Login exitoso para: ${foundUser.username}`);
      return true;
    } else {
      console.error("Intento de login fallido: Credenciales no válidas.");
      throw new Error("Credenciales inválidas");
    }
  },

  logout: () => {
    localStorage.removeItem("authToken");
    set({ token: null, isAuthenticated: false, user: null });
  },
  register: async ({ firstName, lastName, email, password }) => {
    const currentUsers = getMockUsers();

    if (currentUsers.some((user) => user.email === email)) {
      throw new Error("El correo electrónico ya está registrado.");
    }
    addMockUser({ firstName, lastName, email, password });
    await useAuthStore.getState().login(email, password);
    return true;
  },
}));
