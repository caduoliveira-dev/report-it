'use client';
import Session from '@/interfaces/Session';
import Api from '@/lib/api';
import { createContext, useContext, useEffect, useState } from 'react';


export const AuthenticationContext = createContext({
  api: new Api(),
  session: null as Session | null,
  setSession: (session: Session | null) => {},
  updateSession: async () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthenticationContext)
};

export const AuthenticationContextProvider = ({ children }: { children: any | any[] }) => {
  const ctx = useAuth();
  const [session, setSession] = useState<Session | null>(null);

  async function updateSession() {
    const { error, result } = await ctx.api.me();

    if (!error) {
      setSession(result);
    }
  }

  useEffect(() => {
    updateSession();
  }, []);

  const logout = () => {
    setSession(null);
    ctx.api.setToken('');
  };

  return <AuthenticationContext.Provider value={{
    api: ctx.api,
    session,
    setSession,
    logout,
    updateSession,
  }}>{children}</AuthenticationContext.Provider>;
};
