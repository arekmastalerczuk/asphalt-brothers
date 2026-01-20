import { Metadata } from "next";
import UnauthorizedContent from "./UnauthorizedContent";

export const metadata: Metadata = {
  title: "Unauthorized Access",
};

const Unauthorized = () => {
  return <UnauthorizedContent />;
};

export default Unauthorized;
