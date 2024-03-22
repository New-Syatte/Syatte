"use client";
import React, { ReactNode } from "react";
import AuthContext from "@/app/context/AuthContext";
import SWRConfigContext from "./context/SWRConfigContext";
import ToastProvider from "@/components/toastProvider/ToastProvider";
import { Provider } from "react-redux";
import store from "@/redux/store";

interface ProviderProps {
  children: ReactNode;
}

const Providers: React.FC<ProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <SWRConfigContext>
        <AuthContext>
          <ToastProvider />
          {children}
        </AuthContext>
      </SWRConfigContext>
    </Provider>
  );
};

export default Providers;
