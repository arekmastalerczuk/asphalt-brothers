import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/auth";
import { APP_NAME } from "@/lib/constants";
import CredentialsSignInForm from "./CredentialsSignInForm";

export const metadata: Metadata = {
  title: "Sign In",
};

type Props = {
  searchParams: Promise<{ callbackUrl: string }>;
};

const SignInPage = async ({ searchParams }: Props) => {
  const { callbackUrl } = await searchParams;

  const session = await auth();

  if (session) return redirect(callbackUrl || "/");

  return (
    <div className="mx-auto w-full max-w-md">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              src="/images/logo.png"
              alt={`${APP_NAME} logo`}
              width={100}
              height={100}
              priority
            />
          </Link>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  );
};
export default SignInPage;
