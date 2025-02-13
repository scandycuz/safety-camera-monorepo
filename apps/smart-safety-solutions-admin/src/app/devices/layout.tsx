"use client";
import { SidebarProvider } from "@smart-safety-solutions/components";
import { FunctionComponent, ReactNode } from "react";
import AppSidebar from "../../components/app-sidebar";
import HeaderBar from "../../components/header-bar";

interface DevicesLayoutProps {
  readonly children: ReactNode;
}

const DevicesLayout: FunctionComponent<DevicesLayoutProps> = ({ children }) => {
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

export default DevicesLayout;
