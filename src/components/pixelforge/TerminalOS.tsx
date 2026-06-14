import { useEffect, useRef } from "react";
import { useTerminal } from "../../os/hooks/useTerminal";

export function TerminalOS() {
  const { lines, input, setInput, execute, historyUp, historyDown } = useTerminal();

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // auto scroll
  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  return (
    <div className="fixed top-20 left-20 w-[520px] h-[320px] bg-black text-green-400 border border-green-800 rounded-lg flex flex-col font-mono">
      {/* TITLE BAR */}
      <div className="px-3 py-2 border-b border-green-800 text-green-300">Pixel Terminal OS</div>

      {/* OUTPUT */}
      <div ref={containerRef} className="flex-1 overflow-auto p-2">
        {lines.map((line, i) => (
          <div key={i}>
            {line.type === "input" ? (
              <span className="text-green-500">$ {line.value}</span>
            ) : (
              <span>{line.value}</span>
            )}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="border-t border-green-800 flex items-center px-2 py-2">
        <span className="mr-2">$</span>

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              execute(input);
            }

            if (e.key === "ArrowUp") {
              historyUp();
            }

            if (e.key === "ArrowDown") {
              historyDown();
            }
          }}
          className="bg-transparent outline-none flex-1 text-green-300"
        />
      </div>
    </div>
  );
}
// import { commands, CommandContext } from "../../os/terminal/commands";
// import { useEffect, useRef, useState, useCallback } from "react";
// import { DevMode } from "../../lib/dev-mode";
// import { SystemLog } from "../../lib/system-log";

// // ========== Fake Filesystem ==========
// type FSNode = { type: "file" | "dir"; content?: string; children?: Record<string, FSNode> };
// const fs: Record<string, FSNode> = {
//   "/": {
//     type: "dir",
//     children: {
//       Desktop: { type: "dir", children: {} },
//       Projects: {
//         type: "dir",
//         children: {
//           PixelOS: { type: "dir", children: {} },
//           Portfolio: { type: "dir", children: {} },
//         },
//       },
//       Documents: { type: "dir", children: {} },
//       Downloads: { type: "dir", children: {} },
//       "about.txt": { type: "file", content: "PixelOS is a simulated OS with a retro terminal." },
//       "readme.md": { type: "file", content: "# PixelOS\nWelcome to the terminal." },
//     },
//   },
// };
// let cwd = "/"; // current working directory path

// function resolvePath(path: string): string {
//   if (path.startsWith("/")) return path;
//   if (path === ".") return cwd;
//   if (path === "..") return cwd.split("/").slice(0, -1).join("/") || "/";
//   return cwd === "/" ? `/${path}` : `${cwd}/${path}`;
// }
// function getNode(path: string): FSNode | null {
//   const parts = path.split("/").filter((p) => p);
//   let node = fs["/"];
//   for (const part of parts) {
//     if (node.type !== "dir") return null;
//     node = node.children?.[part];
//     if (!node) return null;
//   }
//   return node;
// }

// // ========== Theme Definitions ==========
// const themes: Record<string, Record<string, string>> = {
//   matrix: {
//     bg: "bg-black",
//     text: "text-green-400",
//     border: "border-green-700",
//     prompt: "text-green-400",
//     input: "text-green-300",
//   },
//   ubuntu: {
//     bg: "bg-[#300a24]",
//     text: "text-[#eee8d5]",
//     border: "border-[#cb4b16]",
//     prompt: "text-[#2aa198]",
//     input: "text-[#93a1a1]",
//   },
//   windows: {
//     bg: "bg-[#0c0c0c]",
//     text: "text-[#cccccc]",
//     border: "border-[#2b5797]",
//     prompt: "text-[#3b88c3]",
//     input: "text-white",
//   },
//   hacker: {
//     bg: "bg-[#0f0f0f]",
//     text: "text-[#00ff41]",
//     border: "border-[#00ff41]",
//     prompt: "text-[#00ff41]",
//     input: "text-[#00ff41]",
//   },
//   light: {
//     bg: "bg-white",
//     text: "text-gray-800",
//     border: "border-gray-300",
//     prompt: "text-blue-600",
//     input: "text-gray-800",
//   },
// };

// // ========== Main Component ==========
// export function TerminalOS({ onClose }: { onClose?: () => void }) {
//   // Window state
//   const [windowState, setWindowState] = useState<"normal" | "minimized" | "maximized">("normal");
//   const [size, setSize] = useState(() => {
//     const saved = localStorage.getItem("terminal-size");
//     return saved ? JSON.parse(saved) : { w: 600, h: 360 };
//   });
//   const [position, setPosition] = useState(() => {
//     const saved = localStorage.getItem("terminal-pos");
//     return saved ? JSON.parse(saved) : { x: 80, y: 80 };
//   });
//   const [isDragging, setIsDragging] = useState(false);
//   const [isResizing, setIsResizing] = useState(false);
//   const dragRef = useRef({
//     startX: 0,
//     startY: 0,
//     startPosX: 0,
//     startPosY: 0,
//     startW: 0,
//     startH: 0,
//   });

//   // Boot sequence
//   const [booted, setBooted] = useState(false);
//   const [bootLines, setBootLines] = useState<string[]>([]);
//   useEffect(() => {
//     const seq = [
//       "PixelOS v1.0",
//       "Loading kernel...",
//       "Loading drivers...",
//       "Mounting filesystem...",
//       "Initializing modules...",
//       "Ready.",
//     ];
//     let i = 0;
//     const interval = setInterval(() => {
//       setBootLines((prev) => [...prev, seq[i]]);
//       i++;
//       if (i >= seq.length) {
//         clearInterval(interval);
//         setBooted(true);
//       }
//     }, 200);
//     return () => clearInterval(interval);
//   }, []);

//   // Terminal core
//   const [output, setOutput] = useState<string[]>([]);
//   const [input, setInput] = useState("");
//   const [history, setHistory] = useState<string[]>([]);
//   const [historyIdx, setHistoryIdx] = useState(-1);
//   const [suggestions, setSuggestions] = useState<string[]>([]);
//   const [theme, setTheme] = useState("matrix");
//   const [isResearching, setIsResearching] = useState(false);
//   const [researchReport, setResearchReport] = useState<{
//     query: string;
//     html: string;
//     sources: string[];
//   } | null>(null);
//   const [showViewer, setShowViewer] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const outputEndRef = useRef<HTMLDivElement>(null);
//   const scrollLock = useRef(false);

//   // Auto-scroll
//   useEffect(() => {
//     if (!scrollLock.current) outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [output]);

//   // Save window position/size
//   useEffect(() => {
//     localStorage.setItem("terminal-size", JSON.stringify(size));
//   }, [size]);
//   useEffect(() => {
//     localStorage.setItem("terminal-pos", JSON.stringify(position));
//   }, [position]);

//   // Print to terminal
//   const print = (line: string) => setOutput((prev) => [...prev, line]);

//   // Command registry
//   const commands: Record<string, (args: string[]) => void> = {
//     pwd: () => print(cwd),
//     ls: () => {
//       const node = getNode(cwd);
//       if (node?.type === "dir" && node.children) print(Object.keys(node.children).join("  "));
//       else print("Not a directory");
//     },
//     cd: (args) => {
//       const target = args[0] || "/";
//       const newPath = target.startsWith("/")
//         ? target
//         : cwd === "/"
//           ? `/${target}`
//           : `${cwd}/${target}`;
//       const node = getNode(newPath);
//       if (node?.type === "dir") cwd = newPath;
//       else print(`cd: ${target}: No such directory`);
//     },
//     mkdir: (args) => {
//       const name = args[0];
//       if (!name) return print("Usage: mkdir <name>");
//       const targetPath = resolvePath(name);
//       const parentPath = targetPath.substring(0, targetPath.lastIndexOf("/")) || "/";
//       const dirName = targetPath.split("/").pop()!;
//       const parent = getNode(parentPath);
//       if (parent?.type === "dir") {
//         if (!parent.children) parent.children = {};
//         if (!parent.children[dirName]) parent.children[dirName] = { type: "dir", children: {} };
//         else print("Directory already exists");
//       } else print("Parent not found");
//     },
//     touch: (args) => {
//       const name = args[0];
//       if (!name) return;
//       const targetPath = resolvePath(name);
//       const parentPath = targetPath.substring(0, targetPath.lastIndexOf("/")) || "/";
//       const fileName = targetPath.split("/").pop()!;
//       const parent = getNode(parentPath);
//       if (parent?.type === "dir") {
//         if (!parent.children) parent.children = {};
//         if (!parent.children[fileName]) parent.children[fileName] = { type: "file", content: "" };
//         else print("File exists");
//       } else print("Parent not found");
//     },
//     cat: (args) => {
//       const name = args[0];
//       if (!name) return;
//       const node = getNode(resolvePath(name));
//       if (node?.type === "file") print(node.content || "");
//       else print("File not found");
//     },
//     tree: (args) => {
//       const printTree = (node: FSNode, prefix: string) => {
//         if (node.type === "dir" && node.children) {
//           Object.entries(node.children).forEach(([name, child], idx, arr) => {
//             const isLast = idx === arr.length - 1;
//             print(`${prefix}${isLast ? "└── " : "├── "}${name}`);
//             printTree(child, `${prefix}${isLast ? "    " : "│   "}`);
//           });
//         }
//       };
//       printTree(getNode(cwd)!, "");
//     },
//     theme: (args) => {
//       if (args[0] && themes[args[0]]) setTheme(args[0]);
//       else print("Available: matrix, ubuntu, windows, hacker, light");
//     },
//     search: (args) => {
//       const term = args.join(" ");
//       if (!term) return;
//       const results = Object.keys(fs["/"].children || {}).filter((f) =>
//         f.toLowerCase().includes(term.toLowerCase()),
//       );
//       print(results.length ? results.join("\n") : "No matches");
//     },
//     open: (args) => {
//       const section = args[0];
//       if (!section) return;
//       const el = document.getElementById(section);
//       if (el) {
//         el.scrollIntoView({ behavior: "smooth" });
//         print(`Scrolling to ${section}`);
//       } else print(`Section ${section} not found`);
//     },
//     about: () =>
//       print("PixelOS – A retro terminal simulation with deep research, filesystem, and themes."),
//     projects: () => print("PixelOS, Portfolio, Hackathon"),
//     skills: () => print("React, TypeScript, Tailwind, Node.js, Python"),
//     resume: () => {
//       window.open("/cv.pdf", "_blank");
//       print("Downloading resume...");
//     },
//     contact: () => print("Email: pixel@os.dev | GitHub: github.com/pixel | LinkedIn: /in/pixel"),
//     socials: () => print("Twitter: @pixel_os | Discord: pixelos.gg | YouTube: /PixelOS"),
//     "deep-research": async (args) => {
//       const query = args.join(" ");
//       if (!query) return print("Usage: deep-research <query>");
//       setIsResearching(true);
//       const steps = ["Searching...", "Collecting...", "Analyzing...", "Generating..."];
//       for (const s of steps) {
//         print(s);
//         await new Promise((r) => setTimeout(r, 600));
//       }
//       const html = `<h1>Report on ${query}</h1><p>Simulated deep research result.</p>`;
//       setResearchReport({ query, html, sources: ["openai.com", "arxiv.org"] });
//       setShowViewer(true);
//       setIsResearching(false);
//     },
//     status: () => {
//       print(
//         `PixelOS v1.0\nTheme: ${theme}\nWindow: ${size.w}x${size.h}\nResearch: ${isResearching ? "Active" : "Idle"}\nHistory: ${history.length} commands`,
//       );
//     },
//     clear: () => setOutput([]),
//     sudo: () => print("Permission denied."),
//     "hack nasa": () => print("Access denied."),
//     whoami: () => print("pixel_raider"),
//     matrix: () => print("Wake up, Neo..."),
//   };
//   // Aliases
//   commands["ls"] = commands["ls"];
//   commands["cd"] = commands["cd"];

//   // Command parser with multi-word support
//   const runCommand = (raw: string) => {
//     if (!raw.trim()) return;
//     setHistory((prev) => [raw, ...prev].slice(0, 50));
//     setHistoryIdx(-1);
//     print(`pixel@pixelos:~$ ${raw}`);
//     const trimmed = raw.trim();
//     let matched = Object.keys(commands)
//       .sort((a, b) => b.length - a.length)
//       .find((k) => trimmed.toLowerCase().startsWith(k.toLowerCase()));
//     if (matched) {
//       const rest = trimmed.slice(matched.length).trim();
//       commands[matched](rest ? rest.split(/\s+/) : []);
//     } else {
//       print(`command not found: ${trimmed.split(/\s+/)[0]}`);
//     }
//   };

//   // Autocomplete & suggestions
//   const updateSuggestions = (val: string) => {
//     if (!val) return setSuggestions([]);
//     const matches = Object.keys(commands).filter((cmd) => cmd.startsWith(val.toLowerCase()));
//     setSuggestions(matches.slice(0, 5));
//   };
//   const handleTab = (e: React.KeyboardEvent) => {
//     if (e.key === "Tab") {
//       e.preventDefault();
//       if (suggestions.length) setInput(suggestions[0]);
//     }
//   };

//   // History navigation
//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       runCommand(input);
//       setInput("");
//       setSuggestions([]);
//     } else if (e.key === "ArrowUp") {
//       if (historyIdx < history.length - 1) {
//         const idx = historyIdx + 1;
//         setHistoryIdx(idx);
//         setInput(history[idx]);
//       }
//     } else if (e.key === "ArrowDown") {
//       if (historyIdx > -1) {
//         const idx = historyIdx - 1;
//         setHistoryIdx(idx);
//         setInput(idx === -1 ? "" : history[idx]);
//       }
//     } else if (e.key === "Tab") handleTab(e);
//     else setTimeout(() => updateSuggestions(input), 10);
//   };

//   // Dragging & resizing handlers (simplified)
//   const startDrag = (e: React.MouseEvent) => {
//     if (windowState === "maximized") return;
//     setIsDragging(true);
//     dragRef.current = {
//       startX: e.clientX,
//       startY: e.clientY,
//       startPosX: position.x,
//       startPosY: position.y,
//       startW: size.w,
//       startH: size.h,
//     };
//   };
//   const startResize = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setIsResizing(true);
//     dragRef.current = {
//       ...dragRef.current,
//       startX: e.clientX,
//       startY: e.clientY,
//       startW: size.w,
//       startH: size.h,
//     };
//   };
//   useEffect(() => {
//     const onMouseMove = (e: MouseEvent) => {
//       if (isDragging)
//         setPosition((prev) => ({
//           x: prev.x + e.clientX - dragRef.current.startX,
//           y: prev.y + e.clientY - dragRef.current.startY,
//         }));
//       else if (isResizing)
//         setSize((prev) => ({
//           w: Math.max(400, prev.w + e.clientX - dragRef.current.startX),
//           h: Math.max(250, prev.h + e.clientY - dragRef.current.startY),
//         }));
//     };
//     const onMouseUp = () => {
//       setIsDragging(false);
//       setIsResizing(false);
//     };
//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("mouseup", onMouseUp);
//     return () => {
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("mouseup", onMouseUp);
//     };
//   }, [isDragging, isResizing]);

//   const minimize = () => setWindowState("minimized");
//   const maximize = () => setWindowState((prev) => (prev === "maximized" ? "normal" : "maximized"));
//   const close = () => onClose?.();

//   if (windowState === "minimized") return null;

//   const themeStyle = themes[theme] || themes.matrix;
//   const windowStyle =
//     windowState === "maximized"
//       ? { top: 0, left: 0, width: "100vw", height: "100vh" }
//       : { top: position.y, left: position.x, width: size.w, height: size.h };

//   return (
//     <>
//       <div
//         className={`fixed ${themeStyle.bg} ${themeStyle.text} ${themeStyle.border} border rounded-lg shadow-2xl flex flex-col overflow-hidden`}
//         style={windowStyle}
//       >
//         {/* Title Bar */}
//         <div
//           className={`flex justify-between items-center px-3 py-2 border-b ${themeStyle.border} cursor-move select-none`}
//           onMouseDown={startDrag}
//         >
//           <span className="font-semibold">Terminal</span>
//           <div className="flex gap-2">
//             <div
//               className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600"
//               onClick={minimize}
//             />
//             <div
//               className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600"
//               onClick={maximize}
//             />
//             <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600" onClick={close} />
//           </div>
//         </div>

//         {/* Boot or Terminal */}
//         {!booted ? (
//           <div className="flex-1 overflow-auto p-3 font-mono text-sm space-y-1">
//             {bootLines.map((l, i) => (
//               <div key={i}>{l}</div>
//             ))}
//           </div>
//         ) : (
//           <>
//             {/* Output */}
//             <div
//               className="flex-1 overflow-auto p-3 font-mono text-sm space-y-1"
//               onScroll={(e) => {
//                 scrollLock.current =
//                   e.currentTarget.scrollTop + e.currentTarget.clientHeight <
//                   e.currentTarget.scrollHeight - 10;
//               }}
//             >
//               {output.map((line, i) => (
//                 <div key={i}>{line}</div>
//               ))}
//               <div ref={outputEndRef} />
//             </div>

//             {/* Suggestion box */}
//             {suggestions.length > 0 && (
//               <div
//                 className={`px-3 py-1 text-xs ${themeStyle.bg} border-t ${themeStyle.border} flex gap-2`}
//               >
//                 {suggestions.map((s) => (
//                   <span
//                     key={s}
//                     className="cursor-pointer hover:underline"
//                     onClick={() => setInput(s)}
//                   >
//                     {s}
//                   </span>
//                 ))}
//               </div>
//             )}

//             {/* Prompt & Input */}
//             <div className={`border-t ${themeStyle.border} flex items-center px-2 py-2`}>
//               <span className={`mr-2 ${themeStyle.prompt}`}>pixel@pixelos:~$</span>
//               <input
//                 ref={inputRef}
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 className={`bg-transparent outline-none flex-1 ${themeStyle.input} font-mono`}
//                 autoFocus
//               />
//               <span className="animate-pulse">█</span>
//             </div>
//           </>
//         )}

//         {/* Resize Handle */}
//         <div
//           className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
//           onMouseDown={startResize}
//         />
//       </div>

//       {/* Document Viewer Modal */}
//       {showViewer && researchReport && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[200]">
//           <div className="bg-white text-gray-900 rounded-lg w-3/4 h-3/4 flex flex-col">
//             <div className="flex justify-between p-4 border-b">
//               <h2>Deep Research: {researchReport.query}</h2>
//               <button onClick={() => setShowViewer(false)}>✕</button>
//             </div>
//             <div className="flex-1 overflow-auto p-4">
//               <div dangerouslySetInnerHTML={{ __html: researchReport.html }} />
//               <h3>Sources</h3>
//               <ul>
//                 {researchReport.sources.map((s, i) => (
//                   <li key={i}>{s}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
