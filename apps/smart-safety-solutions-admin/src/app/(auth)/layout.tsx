"use client";
import {
  SheetProvider,
  SidebarProvider,
} from "@smart-safety-solutions/components";
import { FunctionComponent, ReactNode, useContext, useEffect } from "react";
import AppSidebar from "../../components/app-sidebar";
import HeaderBar from "../../components/header-bar";
import AlertsSheet from "../../components/alerts-sheet";
import { SessionContext } from "@smart-safety-solutions/contexts";
import AppContext from "../../contexts/app/context";

interface AuthLayoutProps {
  readonly children: ReactNode;
}

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ children }) => {
  const { populateSession } = useContext(SessionContext);
  const {
    state: { isAlertsSheetOpen },
  } = useContext(AppContext);

  /**
   * Populates the session context when an authenticated
   * user lands on an authenticated page.
   */
  useEffect(() => {
    populateSession();
  }, [populateSession]);

  return (
    <SidebarProvider>
      <SheetProvider open={isAlertsSheetOpen}>
        <AppSidebar />
        <AlertsSheet />

        <main className="flex flex-1 flex-col">
          <HeaderBar />

          <div className="flex flex-1">{children}</div>
        </main>
      </SheetProvider>
    </SidebarProvider>
  );
};

export default AuthLayout;
