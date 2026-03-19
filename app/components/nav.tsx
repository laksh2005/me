"use client";

import { useAudio } from "@/util/audioContext";
import { ArrowLeft, Home, Music, Music2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export const Navigation: React.FC = () => {
  const router = useRouter();
  const { isPlaying, togglePlayPause } = useAudio();

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="fixed top-4 inset-x-0 mx-auto z-50 w-max">
      <div className="flex items-center gap-3 px-2 py-1 rounded-full backdrop-blur-lg border border-zinc-600/30 bg-zinc-900/40 hover:border-zinc-500/50 transition-all duration-300 group">
        {/* Back Button */}
        <button
          onClick={goBack}
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors duration-200 text-zinc-400 hover:text-zinc-200"
          title="Go back"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Home Button */}
        <Link
          href="/"
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors duration-200 text-zinc-400 hover:text-zinc-200"
          title="Go to home"
        >
          <Home size={18} />
        </Link>

        {/* Music Toggle */}
        <button
          onClick={togglePlayPause}
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors duration-200 text-zinc-400 hover:text-zinc-200"
          title={isPlaying ? "Mute" : "Unmute"}
        >
          {isPlaying ? <Music size={18} /> : <Music2 size={18} />}
        </button>
      </div>
    </div>
  );
};
