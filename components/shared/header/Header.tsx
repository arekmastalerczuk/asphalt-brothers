import React from "react";
import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import RightMenu from "../menu-right/MenuRight";
import CategoryDrawer from "./CategoryDrawer";
import Search from "./Search";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start gap-x-4">
          <CategoryDrawer />
          <Link href="/" className="flex-start">
            <Image
              src="/images/logo.png"
              alt={`${APP_NAME} logo`}
              width={48}
              height={48}
              priority
            />
            <span className="ml-4 hidden text-2xl font-bold tracking-wide md:block">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className="hidden md:block">
          <Search />
        </div>
        <RightMenu />
      </div>
    </header>
  );
};

export default Header;
