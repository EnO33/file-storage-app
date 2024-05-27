"use client";

import { clsx } from "clsx";
import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { FolderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function Header() {
  const pathname = usePathname();

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 z-10 relative">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <Image
              src="/logo.png"
              height={60}
              width={60}
              className="mr-3"
              alt="Applicatio, Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              File Application
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <OrganizationSwitcher />
            <UserButton />
            <SignedOut>
              <SignInButton>
                <Button>Sign in</Button>
              </SignInButton>
            </SignedOut>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  href="/"
                  className={`block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 hover:text-blue-500 animate-in ${pathname === "/" ? "text-blue-400" : ""}`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <SignedIn>
                <li>
                  {/* <Button variant="outline"> */}
                  <Link
                    href="/dashboard/files"
                    className={`block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 hover:text-blue-500 animate-in ${(pathname === "/dashboard/files" || pathname === "/dashboard/favorites" || pathname === "/dashboard/trash") ? "text-blue-400" : ""}`}
                  >
                    <span className="hidden sm:block">Your files</span>
                    <span className="block sm:hidden">
                      <FolderIcon className="size-4" />
                    </span>
                  </Link>
                  {/* </Button> */}
                </li>
              </SignedIn>
              <li>
                <Link
                  href="/about"
                  className={`block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 hover:text-blue-500 animate-in ${pathname === "/about" ? "text-blue-400" : ""}`}
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className={`block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 hover:text-blue-500 animate-in ${pathname === "/privacy" ? "text-blue-400" : ""}`}
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className={`block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 hover:text-blue-500 animate-in ${pathname === "/terms-of-service" ? "text-blue-400" : ""}`}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
