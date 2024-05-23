"use client";

import FileBrowser from "@/app/dashboard/_components/file-browser";

export default function TrashPage() {
  return (
    <div className="flex justify-between items-center mb-8">
      <FileBrowser title="Trash" deletedOnly />
    </div>
  );
}
