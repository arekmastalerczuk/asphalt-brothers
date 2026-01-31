import { Metadata } from "next";
import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.actions";
import CheckoutSteps from "@/components/shared/CheckoutSteps";
import PaymentMethodForm from "./PaymentMethodForm";
import { DEFAULT_PAYMENT_METHOD } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Payment Method",
};

const PaymentMethodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const user = await getUserById(userId);

  return (
    <>
      <CheckoutSteps current={2} />
      <PaymentMethodForm
        preferredPaymentMethod={user?.paymentMethod || DEFAULT_PAYMENT_METHOD}
      />
    </>
  );
};
export default PaymentMethodPage;
