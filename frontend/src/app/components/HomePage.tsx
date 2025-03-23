"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 bg-black overflow-hidden">
        <div className="absolute inset-0 animate-aurora opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl px-6">
        <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Welcome to Real-Time Code Editor
        </h1>
        <p className="text-gray-300 text-lg mb-6 leading-relaxed">
          Experience real-time collaborative coding with powerful tools and seamless integration.
          <br />
          Write, debug, and share code instantly with your team.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => router.push("/editor")}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition"
          >
            Start Coding 🚀
          </button>
          <button
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            onClick={() => router.push("/about")}
          >
            Learn More 📖
          </button>
        </div>
      </div>
    </div>
  );
}
