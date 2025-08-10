"use client";

import Link from "next/link";
import { useState } from "react";

export default function TestPage() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error("Test error");
  }

  return (
    <div className="flex flex-col gap-4 mt-64">
      <Link href="/does-not-exist">Broken Link</Link>
      <button id="trigger-error" onClick={() => setShouldError(true)}>
        Trigger error
      </button>
    </div>
  );
}