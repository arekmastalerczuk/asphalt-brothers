import React from "react";

type Props = {
  readonly children: React.ReactNode;
};
const AuthLayout = ({ children }: Props) => {
  return <div className="flex-center min-h-screen w-full">{children}</div>;
};

export default AuthLayout;
