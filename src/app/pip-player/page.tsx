import { Suspense } from "react";

import ClientPlayer from "./ClientPlayer";

export default function PipPlayerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <p className="text-sm text-white/70">Loading player...</p>
        </div>
      }
    >
      <ClientPlayer />
    </Suspense>
  );
}
