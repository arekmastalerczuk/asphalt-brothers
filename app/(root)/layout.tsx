import React from "react";

type Props = {
  readonly children: React.ReactNode;
};
const layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col">
      <main className="wrapper flex-1">{children}</main>
    </div>
  );
};

export default layout;
