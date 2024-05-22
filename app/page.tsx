"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton, useSession  } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";

export default function Home() {
  const createFile = useMutation(api.files.createFile);
  const files = useQuery(api.files.getFiles);

  return (
    <main className="flex min-h-screen flex-row items-center gap-4 p-24">
      <SignedIn>
        <UserButton />
        <SignOutButton>
          <Button>
            Sign out
          </Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>

      {files && (files?.map((file) => (
        <li key={file._id}>{file.name}</li>
      )))}

      <Button onClick={() => createFile({name: "hello world"})}>Click me</Button>
    </main>
  );
}
