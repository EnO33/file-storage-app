"use client";

import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import UploadButton from "./upload-button";
import { FileCard } from "./file-card";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId: orgId } : "skip");
  const isLoading = files === undefined;

  return (
    <main className="container mx-auto pt-12">

      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24 text-slate-700"><Loader2 className="size-32 animate-spin" />Loading your files...</div>
      )}

      {!isLoading && files.length === 0 && (
        <div className="flex flex-col gap-8 w-full items-center mt-24">
          <Image
            alt="an image of a picture and directory icon"
            width={400}
            height={400}
            src="/empty.svg"
          />
          <div className="text-2xl">You have no files, upload one now</div>
          <UploadButton />
        </div>
      )}
      {!isLoading && files.length > 0 && (
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Your files ({files?.length})</h1>
          <UploadButton />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {files && files?.map((file) => <FileCard key={file._id} file={file} />)}
      </div>
    </main>
  );
}
