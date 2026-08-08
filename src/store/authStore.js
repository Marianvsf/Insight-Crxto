import { create } from "zustand";
import { getMockUsers, addMockUser } from "../mocks/mockUsers.js";

const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// La sesión solo es válida si existen token Y usuario. Si falta alguno
// (token viejo, storage corrupto), se limpia todo para no quedar en un
// estado "autenticado" sin usuario.
const getInitialSession = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const rawUser = localStorage.getItem(USER_KEY);

  if (!token || !rawUser) {
    if (token || rawUser) clearSession();
    return { token: null, isAuthenticated: false, user: null };
  }

  try {
    const user = JSON.parse(rawUser);
    if (!user?.email) throw new Error("Usuario inválido en storage");
    return { token, isAuthenticated: true, user };
  } catch {
    clearSession();
    return { token: null, isAuthenticated: false, user: null };
  }
};

export const useAuthStore = create((set) => ({
  ...getInitialSession(),

  login: async (email, password) => {
    const foundUser = getMockUsers().find(
      (user) => user.email === email && user.password === password,
    );

    if (foundUser) {
      const fakeToken = "fake-jwt-token-" + foundUser.id + Date.now();
      const sessionUser = {
        email: foundUser.email,
        username: foundUser.username,
        role: foundUser.role,
        id: foundUser.id,
      };
      localStorage.setItem(TOKEN_KEY, fakeToken);
      localStorage.setItem(USER_KEY, JSON.stringify(sessionUser));
      set({
        token: fakeToken,
        isAuthenticated: true,
        user: sessionUser,
      });
      return true;
    }

    return false;
  },

  logout: () => {
    clearSession();
    set({ token: null, isAuthenticated: false, user: null });
    return true;
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
