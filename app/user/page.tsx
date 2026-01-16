import { redirect } from "next/navigation";

const page = () => {
  redirect("/user/orders");
};

export default page;
