'use client';
import Session from '@/interfaces/Session';
import Api from '@/lib/api';
import { createContext, useContext, useEffect, useState } from 'react';


export const AuthenticationContext = createContext({
  api: new Api(),
  session: null as Session | null,
  setSession: (session: Session | null) => {},
});

export const useAuth = () => {
  return useContext(AuthenticationContext)
};

export const AuthenticationContextProvider = ({ children }: { children: any | any[] }) => {
  const ctx = useAuth();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    (async () => {
      const { error: meError, result: meResult } = await ctx.api.me();

      if (!meError) {
        setSession(meResult);
      }
    })();
  }, []);

  return <AuthenticationContext.Provider value={{
    api: ctx.api,
    session,
    setSession,
  }}>{children}</AuthenticationContext.Provider>;
};
