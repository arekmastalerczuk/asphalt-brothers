import React from "react";
import Footer from "@/components/shared/footer/Footer";
import AdminHeader from "@/components/shared/admin-header/AdminHeader";

type Props = {
  readonly children: React.ReactNode;
};
const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col">
      <AdminHeader />
      <main className="container mx-auto flex-1 space-y-4 p-8 pt-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
