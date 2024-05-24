import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useSession,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Header() {
  return (
    <div className="relative z-10 border-b bg-gray-50">
      <div className="container mx-auto justify-between flex  py-4 items-center">
        <Link href="/" className="flex gap-2 items-center text-xl">
          <Image
            src="/logo.png"
            alt="Application logo"
            width={60}
            height={60}
          />{" "}
          File Application
        </Link>
        <SignedIn>
          <Button variant="outline">
            <Link href="/dashboard/files">Your files</Link>
          </Button>
        </SignedIn>
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
