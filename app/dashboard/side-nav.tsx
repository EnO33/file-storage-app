"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { FileIcon, StarIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideNav() {
  const pathname = usePathname();

  return (
    <div className="md:w-40 w-10 flex flex-col gap-4">
      <Link href="/dashboard/files">
        <Button variant={"link"} className={clsx("flex gap-2", {
          'text-blue-500': pathname.includes("/dashboard/files")
        })}>
          <FileIcon /> <span className="hidden md:block">All Files</span>
        </Button>
      </Link>
      <Link href="/dashboard/favorites">
      <Button variant={"link"} className={clsx("flex gap-2", {
          'text-blue-500': pathname.includes("/dashboard/favorites")
        })}>
          <StarIcon /> <span className="hidden md:block">Favorites</span>
        </Button>
      </Link>
      <Link href="/dashboard/trash">
      <Button variant={"link"} className={clsx("flex gap-2", {
          'text-blue-500': pathname.includes("/dashboard/trash")
        })}>
          <TrashIcon /> <span className="hidden md:block">Trash</span>
        </Button>
      </Link>
    </div>
  );
}
