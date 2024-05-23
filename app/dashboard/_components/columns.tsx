"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "convex/react";
import { formatRelative } from "date-fns";
import { FileCardAction } from "./file-actions";

function UserCell({ userId }: { userId: Id<"users"> }) {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: userId,
  });
  return (
    <div className="flex gap-2 text-xs text-slate-700 items-center">
      <Avatar className="size-6">
        <AvatarImage src={userProfile?.image} />
        <AvatarFallback>{userProfile?.name}</AvatarFallback>
      </Avatar>
      {userProfile?.name}
    </div>
  );
}

export const columns: ColumnDef<Doc<"files"> & { isFavorited: boolean }>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    header: "User",
    cell: ({ row }) => {
      return <UserCell userId={row.original.userId} />;
    },
  },
  {
    header: "Uploaded on",
    cell: ({ row }) => {
      return (
        <div>
          {formatRelative(new Date(row.original._creationTime), new Date())}
        </div>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <FileCardAction file={row.original} isFavorited={row.original.isFavorited} />
      );
    },
  },
];
