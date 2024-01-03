import React, { ReactNode } from "react";
import AuthContext from "@/app/context/AuthContext";
import Providers from "@/redux/provider";
import SWRConfigContext from "./context/SWRConfigContext";
import ToastProvider from "@/components/toastProvider/ToastProvider";

interface ProviderProps {
  children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <>
      <Providers>
        <SWRConfigContext>
          <AuthContext>
          <ToastProvider />
            {children}
          </AuthContext>
        </SWRConfigContext>
      </Providers>
    </>
  );
};

export default Provider;
