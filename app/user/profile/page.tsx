import { Metadata } from "next";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import ProfileForm from "./ProfileForm";

export const metadata: Metadata = {
  title: "Customer Profile",
};

const Profile = async () => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="mx-auto max-w-md space-y-4">
        <h1 className="h2-bold">Profile</h1>
        <ProfileForm />
      </div>
    </SessionProvider>
  );
};
export default Profile;
