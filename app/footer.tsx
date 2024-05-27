import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <>
      <div className="flex-1"></div>
      <div className="h-40 bg-slate-100 mt-12 flex items-center bottom-0 w-full relative z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link href="/" className="flex flex-row items-center text-xl">
              <Image src="/logo.png" alt="logo" width={100} height={100} />
              <span className="hidden md:block">File Application</span>
            </Link>
          </div>
          <div className="flex mx-auto justify-between gap-12">
            <Link className="hover:text-blue-500" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="hover:text-blue-500" href="/terms-of-service">
              Terms of Service
            </Link>
            <Link className="hover:text-blue-500" href="/about">
              About
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
