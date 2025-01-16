"use client";
import React from "react";
import { BackgroundBeams } from "./BackgroundBeams";

export function BackgroundBeamsDemo() {
  return (
    <div className="h-[60rem] w-full  bg-white relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4"></div>
      <BackgroundBeams />
    </div>
  );
}
