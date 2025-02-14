"use client";
import { SidebarProvider } from "@smart-safety-solutions/components";
import { FunctionComponent, ReactNode, useContext, useEffect } from "react";
import AppSidebar from "../../components/app-sidebar";
import HeaderBar from "../../components/header-bar";
import { SessionContext } from "@smart-safety-solutions/contexts";

interface AuthLayoutProps {
  readonly children: ReactNode;
}

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ children }) => {
  const { populateSession } = useContext(SessionContext);

  /**
   * Populates the session context when an authenticated
   * user lands on an authenticated page.
   */
  useEffect(() => {
    populateSession();
  }, [populateSession]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col">
        <HeaderBar />

        <div className="flex flex-1">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default AuthLayout;
