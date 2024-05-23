import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignInButton,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Header() {
  return (
    <div className="border-b">
      <div className="container mx-auto justify-between flex bg-gray-50 py-4 items-center">
        <Link href="/" className="flex gap-2 items-center text-xl">
          <Image
            src="/logo.png"
            alt="Application logo"
            width={60}
            height={60}
          />{" "}
          File Application
        </Link>
        <Button variant="outline">
            <Link href="/dashboard/files">
                Your files
            </Link>
        </Button>
        <div className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />
          <SignedOut>
            <SignInButton>
              <Button>Sign in</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
