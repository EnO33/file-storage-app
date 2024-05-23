"use client";

import FileBrowser from "@/app/dashboard/_components/file-browser";

export default function FavoritesPage() {
  return (
    <div className="flex justify-between items-center mb-8">
      <FileBrowser title="Favorites" favoritesOnly />
    </div>
  );
}
