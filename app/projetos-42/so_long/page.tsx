"use client";

import { useRouter } from "next/navigation";
import SoLongDemo from "@/components/demos/SoLongDemo";

export default function SoLongPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-8 space-y-4">
      <SoLongDemo />

      {/* <button
        onClick={() => router.back()}
        className="px-4 py-2 bg-gray-200 rounded text-black hover:bg-gray-300 font-medium"
      >
        Back
      </button> */}
    </div>
  );
}
