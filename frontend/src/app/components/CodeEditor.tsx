"use client";

import { useEffect, useRef, useState } from "react";
import { Editor, OnMount } from "@monaco-editor/react";
import { io } from "socket.io-client";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import type * as monaco from "monaco-editor";
import axios from "axios";
import * as Select from "@radix-ui/react-select";

const socket = io("http://localhost:3001");

const supportedLanguages = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "C++", value: "cpp" },
];

export default function CodeEditor() {
  const [code, setCode] = useState("// Start coding...");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider("ws://localhost:3001", "room-1", ydoc);
    const yText = ydoc.getText("monaco");

    yText.observe(() => {
      setCode((prevCode) => {
        const newCode = yText.toString();
        return prevCode !== newCode ? newCode : prevCode;
      });
    });

    socket.on("code-update", (newCode) => {
      setCode((prevCode) => (prevCode !== newCode ? newCode : prevCode));
    });

    return () => {
      provider.destroy();
      socket.disconnect();
    };
  }, []);

  const handleEditorMount: OnMount = (editor) => {
    if (editor) {
      editorRef.current = editor;
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
    socket.emit("code-change", { room: "room-1", content: value });
  };

  const executeCode = async () => {
    setOutput("Running...");
    setIsRunning(true);
    try {
      const response = await axios.post("http://localhost:3001/execute", {
        language,
        code,
      });
      setOutput(response.data.output);
    } 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars 
    catch (error) {
      setOutput("Execution failed. Please check your code.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="relative h-screen w-screen bg-black text-white flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-40 blur-[80px]"></div>

      <div className="relative z-10 w-full max-w-[1400px] flex gap-6 h-[85vh] bg-opacity-10 bg-gray-900 backdrop-blur-lg rounded-xl border border-gray-700 shadow-2xl p-6">
        <div className="flex flex-col w-[65%] space-y-4">
          <div className="flex justify-between items-center">
            <Select.Root value={language} onValueChange={setLanguage}>
              <Select.Trigger className="w-[180px] bg-gray-800 text-white border border-gray-600 px-3 py-2 rounded-lg transition-all hover:scale-105 hover:bg-gray-700 flex items-center justify-center">
                <Select.Value>
                  {supportedLanguages.find((l) => l.value === language)?.label}
                </Select.Value>
              </Select.Trigger>
              <Select.Content className="bg-gray-900 border border-gray-700 text-white rounded-lg shadow-lg">
                {supportedLanguages.map(({ label, value }) => (
                  <Select.Item key={value} value={value} className="px-3 py-2 cursor-pointer hover:bg-gray-800">
                    {label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>

            <button
              className="bg-white text-black hover:bg-gray-300 px-5 py-2 rounded-lg font-medium transition-all hover:scale-105"
              onClick={executeCode}
              disabled={isRunning}
            >
              {isRunning ? "Running..." : "Run Code"}
            </button>
          </div>

          <div className="border border-gray-700 rounded-lg overflow-hidden shadow-lg flex-grow">
            <Editor
              height="100%"
              theme="vs-dark"
              language={language}
              value={code}
              onChange={handleEditorChange}
              onMount={handleEditorMount}
              options={{
                fontSize: 16,
                fontFamily: "Fira Code, monospace",
                minimap: { enabled: false },
                lineNumbers: "on",
                cursorBlinking: "smooth",
                automaticLayout: true,
              }}
            />
          </div>
        </div>

        <div className="w-[35%] flex flex-col">
          <h3 className="text-lg font-semibold text-gray-300">Output:</h3>
          <div className="p-4 bg-gray-900 text-green-400 font-mono min-h-[300px] rounded-lg border border-gray-700 shadow-lg overflow-auto flex-grow text-sm leading-relaxed">
            <pre className="whitespace-pre-wrap break-words">{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
