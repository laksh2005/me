"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

interface AudioContextType {
  isPlaying: boolean;
  togglePlayPause: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!audioRef.current) {
      audioRef.current = new Audio("/song.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.05;
    }

    const timer = setTimeout(() => {
      if (audioRef.current && isPlaying) {
        audioRef.current.play().catch(() => {
          // Autoplay blocked, will require user interaction
        });
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [mounted, isPlaying]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay blocked
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlayPause }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
}
