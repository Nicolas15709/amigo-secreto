"use client";

import MusicPlayer from "@/components/MusicPlayer";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MusicPlayer />
      {children}
    </>
  );
}