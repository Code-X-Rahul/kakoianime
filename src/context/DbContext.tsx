"use client";
import { createContext, useContext } from "react";


const DbContext = createContext<any>(null);

export function useAuth() {
  return useContext(DbContext);
}

export function DbProvider({ children }: any) {

  return <DbContext.Provider value={{}}>{children}</DbContext.Provider>;
}
