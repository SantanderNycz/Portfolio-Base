"use client";

import { useRouter } from "next/navigation";
import GetNextLineDemo from "@/components/demos/GetNextLineDemo";

export default function GetNextLinePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-8 space-y-4">
      <GetNextLineDemo />

      {/* <button
        onClick={() => router.back()}
        className="px-4 py-2 bg-gray-200 rounded text-black hover:bg-gray-300 font-medium"
      >
        Back
      </button> */}
    </div>
  );
}
