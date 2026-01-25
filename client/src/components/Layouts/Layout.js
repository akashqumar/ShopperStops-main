import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      <main className="flex-1 min-h-[80vh]">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1e293b",
              color: "#f8fafc",
              borderRadius: "12px",
              padding: "12px 16px",
            },
            success: { iconTheme: { primary: "#14b8a6" } },
            error: { iconTheme: { primary: "#f87171" } },
          }}
        />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
