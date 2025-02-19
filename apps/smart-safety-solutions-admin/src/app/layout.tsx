import { SessionProvider } from "@smart-safety-solutions/contexts";
import AppProvider from "../contexts/app/provider";
import { ApiProvider } from "@smart-safety-solutions/apis";
import "./global.css";

export const metadata = {
  title: "Smart Safety Solutions Admin App",
  description: "Admin application for Smart Safety Solutions devices",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <AppProvider>
        <ApiProvider>
          <html lang="en">
            <body>{children}</body>
          </html>
        </ApiProvider>
      </AppProvider>
    </SessionProvider>
  );
};

export default RootLayout;
