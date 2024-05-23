import FileBrowser from "@/app/dashboard/_components/file-browser";

export default function FilesPage() {
    return (
      <div className="flex justify-between items-center mb-8">
        <FileBrowser title="Your Files" />
      </div>
    );
  }
  