"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import CodeEditor from "@/app/components/CodeEditor";

export default function HomePage() {
  const [started, setStarted] = useState(false);
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex flex-col bg-black overflow-hidden relative">
      {/* Aurora Background */}
      <div className="absolute inset-0 bg-black overflow-hidden">
        <div className="absolute inset-0 animate-aurora opacity-50"></div>
      </div>

      {/* Navbar - Ensures it stays on top */}
      <div className="relative z-20 w-full">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow relative z-10 px-6">
        {started ? (
          <CodeEditor />
        ) : (
          <div className="text-center max-w-2xl">
            <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-gray-400">
              Real-Time Code Editor
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Collaborate, code, and build together in real-time.  
              Write, debug, and share code instantly with your team.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button
                onClick={() => setStarted(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-gray-600 text-white rounded-lg hover:scale-105 transition"
              >
                Start Coding 
              </button>
              <button
                onClick={() => router.push("/about")}
                className="px-8 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Learn More
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
