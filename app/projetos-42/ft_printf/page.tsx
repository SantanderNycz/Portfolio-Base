"use client";

import { useRouter } from "next/navigation";
import FtPrintfDemo from "@/components/demos/FtPrintfDemo";

export default function FtPrintfPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-8 space-y-4">
      <FtPrintfDemo />

      <button
        onClick={() => router.back()}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-400 text-black font-medium"
      >
        Back
      </button>
    </div>
  );
}
