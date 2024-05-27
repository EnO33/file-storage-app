"use client";

import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import UploadButton from "@/app/dashboard/_components/upload-button";
import { FileCard } from "@/app/dashboard/_components/file-card";
import Image from "next/image";
import { GridIcon, Loader2, RowsIcon } from "lucide-react";
import { SearchBar } from "@/app/dashboard/_components/search-bar";
import { useState } from "react";
import { DataTable } from "./file-table";
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Doc } from "@/convex/_generated/dataModel";
import { Label } from "@/components/ui/label";

function Placeholder() {
  return (
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
  );
}

export default function FileBrowser({
  title,
  favoritesOnly,
  deletedOnly,
}: {
  title: string;
  favoritesOnly?: boolean;
  deletedOnly?: boolean;
}) {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<Doc<"files">["type"] | "all">("all");

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const favorites = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : "skip"
  );

  const files = useQuery(
    api.files.getFiles,
    orgId
      ? {
          orgId: orgId,
          type: type === "all" ? undefined : type,
          query,
          favorites: favoritesOnly,
          deletedOnly,
        }
      : "skip"
  );
  const isLoading = files === undefined;

  const modifiedFiles =
    files?.map((file) => ({
      ...file,
      isFavorited: (favorites ?? []).some(
        (favorite) => favorite.fileId === file._id
      ),
    })) ?? [];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold items-center flex gap-2">
          {title} {files && <Badge className="text-base">{files.length}</Badge>}
        </h1>
        <div className="hidden md:flex lg:justify-between md:gap-4">
          <SearchBar query={query} setQuery={setQuery} />
          <UploadButton />
        </div>
      </div>
      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24 text-slate-700">
          <Loader2 className="size-32 animate-spin" />
          Loading your files...
        </div>
      )}
      
      {files && files.length > 0 && (
        <Tabs defaultValue="grid">
          <div className="flex justify-between items-center">
            <TabsList className="mb-2 md:w-auto w-full">
              <TabsTrigger value="grid" className="flex gap-2 items-center">
                <GridIcon /> Grid
              </TabsTrigger>
              <TabsTrigger value="table" className="flex gap-2 items-center">
                <RowsIcon /> Table
              </TabsTrigger>
            </TabsList>
            <div className="hidden md:flex lg:justify-between md:gap-2 items-center">
              <Label htmlFor="type-select">Type Filter</Label>
              <Select
                value={type}
                onValueChange={(newType) => {
                  setType(newType as any);
                }}
              >
                <SelectTrigger id="type-select" className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="md:hidden flex flex-col justify-between gap-4 my-8">
            <SearchBar query={query} setQuery={setQuery} />
            <UploadButton />
          </div>

          <TabsContent value="grid">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {modifiedFiles?.map((file) => (
                <FileCard key={file._id} file={file} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="table">
            <DataTable columns={columns} data={modifiedFiles} />
          </TabsContent>
        </Tabs>
      )}

      {files?.length === 0 && <Placeholder />}
    </div>
  );
}
