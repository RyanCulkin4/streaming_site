// /context/AuthProvider.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useContext, useState } from 'react'


/* Global Auth Provider to manage authentication state across the app */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}


/* Global Context for other global states like theme, user info, etc. */
const GlobalContext = createContext<any>(null)

export function GlobalProvider({ children }: { children: React.ReactNode }) {

  // Add Vars you want to be global here
  

  return (
    // Make sure to return created vars here
    <GlobalContext.Provider value={{  }}>
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobal() {
  return useContext(GlobalContext)
}
