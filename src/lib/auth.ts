const AUTH_KEY = 'auth';

export const auth = {
  set: (id: string) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ id }));
  },

  get: () => {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  },

  clear: () => localStorage.removeItem(AUTH_KEY),

  isAdmin: () => auth.get()?.id ? true : false
};
