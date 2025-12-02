import React from "react";
import { FaGithub } from "react-icons/fa";
import { APP_NAME, AUTHOR, GITHUB_PROFILE } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="my-4 flex flex-col items-center justify-center gap-y-4 p-5">
        <p className="text-center text-sm md:text-base">
          &copy; {currentYear}{" "}
          <span className="ml-0.5 tracking-wider">{APP_NAME}</span>{" "}
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-4 inline-flex items-center justify-center gap-x-2 font-bold tracking-wider"
          >
            {AUTHOR} <FaGithub className="size-4 lg:size-5" />
          </a>{" "}
          All rights reserved.
        </p>
        <p className="text-sm">
          The site uses free photos from
          <a
            href="https://www.pexels.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary ml-1 tracking-wider hover:underline"
          >
            Pexels.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
