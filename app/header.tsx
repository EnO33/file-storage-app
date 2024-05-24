import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useSession,
} from "@clerk/nextjs";
import { FileIcon, FolderIcon } from "lucide-react";
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
          <span className="hidden md:block">File Application</span>
        </Link>
        <SignedIn>
          <Button variant="outline">
            <Link href="/dashboard/files"><span className="hidden sm:block">Your files</span><span className="block sm:hidden"><FolderIcon className="size-4" /></span></Link>
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
