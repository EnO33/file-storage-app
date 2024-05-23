"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  useOrganization,
  useUser,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";

export default function Home() {
  const organization = useOrganization();
  const createFile = useMutation(api.files.createFile);
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id
  }  user.user?.id;

  const files = useQuery(
    api.files.getFiles,
    orgId ? { orgId: orgId } : 'skip'
  );

  return (
    <main className="flex min-h-screen flex-row items-center gap-4 p-24">
      {files && files?.map((file) => <li key={file._id}>{file.name}</li>)}

      <Button
        onClick={() => {
          if (!orgId) return;
          createFile({ name: "hello world", orgId: orgId });
        }}
      >
        Add a file
      </Button>
    </main>
  );
}
