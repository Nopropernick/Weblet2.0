"use client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-gray-900/90 backdrop-blur-lg shadow-lg flex items-center px-6 z-50">
      <h1 className="text-white text-xl font-bold">💻 Real-Time Code Editor</h1>
      <div className="ml-auto flex space-x-4">
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          onClick={() => router.push("/")}
        >
          Home 🏠
        </button>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          onClick={() => router.push("/profile")}
        >
          Profile 👤
        </button>
      </div>
    </div>
  );
}
