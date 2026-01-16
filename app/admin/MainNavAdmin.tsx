"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { title: "Overview", href: "/admin/overview" },
  { title: "Products", href: "/admin/products" },
  { title: "Orders", href: "/admin/orders" },
  { title: "Users", href: "/admin/users" },
];

const MainNavUser = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {links.map((link) => {
        const { title, href } = link;

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "hover:text-primary text-sm font-medium transition-colors",
              pathname.includes(href) ? "" : "text-muted-foreground",
            )}
          >
            {title}
          </Link>
        );
      })}
    </nav>
  );
};
export default MainNavUser;
