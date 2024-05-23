"use client";

import FileBrowser from "@/app/dashboard/_components/file-browser";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function FavoritesPage() {
  return (
    <div className="flex justify-between items-center mb-8">
      <FileBrowser title="Favorites" favorites />
    </div>
  );
}
