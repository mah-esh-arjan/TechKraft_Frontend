const AUTH_KEY = 'auth';

export const auth = {
  set: (id: string, isAdmin: boolean) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ id, isAdmin }));
  },

  get: () => {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  },

  clear: () => localStorage.removeItem(AUTH_KEY),

  isAdmin: () => auth.get()?.isAdmin || false
};
