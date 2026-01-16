import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import RightMenu from "../menu-right/MenuRight";
import MainNavAdmin from "@/app/admin/MainNavAdmin";
import { Input } from "@/components/ui/input";

const AdminHeader = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <Image
              src="/images/logo.png"
              alt={`${APP_NAME} logo`}
              width={48}
              height={48}
              priority
            />
          </Link>
          <MainNavAdmin className="mx-6" />
        </div>
        <div>
          <Input
            type="search"
            placeholder="Search..."
            className="md:w-[100px] lg:w-[300px]"
          />
        </div>
        <RightMenu />
      </div>
    </header>
  );
};
export default AdminHeader;
