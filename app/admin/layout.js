
import React from "react";
import AdminNavbar from "@/components/AuthorisedNavbar";

const layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
    
      <div className="flex-1">
        <AdminNavbar />
        <main className="pt-16">
          {" "}
          {/* ← offset for navbar height */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default layout;
