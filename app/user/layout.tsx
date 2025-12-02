import React from "react";
import Footer from "@/components/shared/footer/Footer";
import UserHeader from "@/components/shared/user-header/UserHeader";

type Props = {
  readonly children: React.ReactNode;
};
const UserLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col">
      <UserHeader />
      <main className="container mx-auto flex-1 space-y-4 p-8 pt-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
