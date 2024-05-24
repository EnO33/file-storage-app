import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Doc, Id } from "@/convex/_generated/dataModel";
import {
  DownloadIcon,
  MoreVertical,
  StarIcon,
  Trash2Icon,
  UndoIcon,
} from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import { Protect } from "@clerk/nextjs";

export function FileCardAction({
  file,
  isFavorited,
  fileUrl
}: {
  file: Doc<"files">;
  isFavorited: boolean;
  fileUrl: string;
}) {
  const deleteFile = useMutation(api.files.deleteFile);
  const restoreFile = useMutation(api.files.restoreFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);
  const { toast } = useToast();
  const me = useQuery(api.users.getMe);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will mark this file for deletion process. Files are
              deleted periodically.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({
                  fileId: file._id,
                });

                toast({
                  title: "File marked for deletion",
                  description: "Your file will be deleted soon",
                  variant: "success",
                });
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex gap-1 items-center cursor-pointer"
            onClick={() => {
              window.open(fileUrl, "_blank");
            }}
          >
            <DownloadIcon className="size-4 mr-2" /> Download
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-1 items-center cursor-pointer"
            onClick={() => {
              toggleFavorite({
                fileId: file._id,
              });
            }}
          >
            {isFavorited ? (
              <StarIcon className="size-4 mr-2 text-yellow-500" />
            ) : (
              <StarIcon className="size-4 mr-2" />
            )}{" "}
            {isFavorited ? "Unfavorite" : "Favorite"} File
          </DropdownMenuItem>
          <Protect condition={(check) => {
            return check({
              role: "org:admin",
            }) || file.userId === me?._id;
          }} fallback={<></>}>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-1 items-center cursor-pointer"
              onClick={() => {
                if (file.shouldDelete) {
                  restoreFile({
                    fileId: file._id,
                  });
                } else {
                  setIsConfirmOpen(true);
                }
              }}
            >
              {file.shouldDelete ? (
                <div className="flex gap-1 text-emerald-500">
                  <UndoIcon className="size-4 mr-2" /> Restore
                </div>
              ) : (
                <div className="flex gap-1 text-rose-500">
                  <Trash2Icon className="size-4 mr-2" /> Delete
                </div>
              )}
            </DropdownMenuItem>
          </Protect>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

// export function getFileUrl(fileId: Id<"_storage">): string {
//   return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
// }
