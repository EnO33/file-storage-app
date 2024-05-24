import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { FileTextIcon, GanttChartIcon, ImageIcon, Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { formatDistance } from "date-fns";
import { FileCardAction } from "./file-actions";

export const getFileUrl = (file: Id<"_storage">) => {
  const url = useQuery(
    api.files.getImage,
    { fileId: file }
  );
  return url
}

export function FileCard({
  file,
}: {
  file: Doc<"files"> & { isFavorited: boolean };
}) {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId,
  });

  const fileUrl = getFileUrl(file.fileId) as string;

  const isLoading = fileUrl === undefined;

  const typeIcons = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChartIcon />,
  } as Record<Doc<"files">["type"], ReactNode>;

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2 text-base font-normal">
          <div className="flex justify-center">{typeIcons[file.type]}</div>{" "}
          {file.name}
        </CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardAction isFavorited={file.isFavorited} file={file} fileUrl={fileUrl} />
        </div>
      </CardHeader>
      <CardContent className="h-[150px] flex justify-center items-center">
      {file.type === "image" && (() => {
        if (isLoading) {
          return (
            <Loader2 className="size-4 animate-spin" />
          )
        }
        else {
          return (
            <Image
              alt={file.name}
              width="200"
              height="100"
              src={fileUrl}
            />
          );
        }
      })()}
        {file.type === "csv" && <GanttChartIcon className="size-20" />}
        {file.type === "pdf" && <FileTextIcon className="size-20" />}
      </CardContent>
      <CardFooter className="flex justify-between flex-col gap-2">
        <div className="flex gap-2 text-xs text-slate-700 items-center">
          <Avatar className="size-6">
            <AvatarImage src={userProfile?.image} />
            <AvatarFallback>{userProfile?.name}</AvatarFallback>
          </Avatar>
          {userProfile?.name}
        </div>
        <div className="text-xs text-slate-700">
          Uploaded {formatDistance(new Date(file._creationTime), new Date(), { addSuffix: true })}
        </div>
      </CardFooter>
    </Card>
  );
}
