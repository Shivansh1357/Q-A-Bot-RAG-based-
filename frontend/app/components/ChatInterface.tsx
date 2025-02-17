// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { Send, Loader2 } from "lucide-react";
// type MessageType = { role: "user" | "bot"; text: string };
// export default function ChatInterface() {
//   const [messages, setMessages] = useState<MessageType[]>([]);
//   const [input, setInput] = useState("");
//   const chatEndRef = useRef<HTMLDivElement | null>(null);

//   // API Call for AI Response
//   const mutation = useMutation({
//     mutationFn: async (message: string) => {
//       const response = await fetch("/documents/query/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query:message }),
//       });
//       const data = await response.json();
//       return data.reply;
//     },
//     onSuccess: (reply) => {
//       setMessages((prev) => [...prev, { role: "bot", text: reply }]);
//     },
//   });

//   const handleSendMessage = () => {
//     if (!input.trim()) return;

//     // Ensure the correct type
//     const userMessage: MessageType = { role: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     mutation.mutate(input);
//   };

//   // Auto-scroll to latest message
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex flex-col w-full max-w-2xl h-[500px] border rounded-lg shadow-md bg-white">
//       {/* Chat Box */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {messages.length === 0 && (
//           <p className="text-gray-500 text-center">Ask me anything...</p>
//         )}
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-3 rounded-lg max-w-xs ${
//               msg.role === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-gray-800"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//         {mutation.status && (
//           <div className="p-3 bg-gray-200 text-gray-800 rounded-lg max-w-xs">
//             <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" /> Thinking...
//           </div>
//         )}
//         <div ref={chatEndRef}></div>
//       </div>

//       {/* Chat Input */}
//       <div className="flex items-center border-t p-3">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 p-2 border rounded-md outline-none"
//           placeholder="Type your message..."
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <button
//           onClick={handleSendMessage}
//           className="ml-3 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//           disabled={Boolean(mutation.status)}
//         >
//           <Send className="w-5 h-5" />
//         </button>
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { Send, Bot, Loader2, User } from "lucide-react";

// // Message Type
// type MessageType = { role: "user" | "bot"; text: string; source?: "llm" | "rag" };

// export default function ChatInterface() {
//   const [messages, setMessages] = useState<MessageType[]>([]);
//   const [input, setInput] = useState("");
//   const chatEndRef = useRef<HTMLDivElement | null>(null);

//   // API Call for AI Response
//   const mutation = useMutation({
//     mutationFn: async (message: string) => {
//       const response = await fetch("/documents/query/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query: message }),
//       });
//       const data = await response.json();
//       return { reply: data.reply, source: data.source };
//     },
//     onSuccess: ({ reply, source }) => {
//       setMessages((prev) => [...prev, { role: "bot", text: reply, source }]);
//     },
//   });

//   const handleSendMessage = () => {
//     if (!input.trim()) return;

//     setMessages((prev) => [...prev, { role: "user", text: input }]);
//     setInput("");
//     mutation.mutate(input);
//   };

//   // Auto-scroll to latest message
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="w-full max-w-2xl h-[500px] flex flex-col border rounded-xl shadow-lg bg-white">
//       {/* Chat Box */}
//       <div className="flex-1 p-4 overflow-y-auto space-y-4">
//         {messages.length === 0 && <p className="text-gray-500 text-center mt-10">Ask me anything...</p>}
//         {messages.map((msg, index) => (
//           <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
//             <div
//               className={`p-3 max-w-xs rounded-lg shadow-md ${
//                 msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 {msg.role === "bot" && <Bot className="w-5 h-5 text-gray-500" />}
//                 {msg.role === "user" && <User className="w-5 h-5 text-gray-200" />}
//                 <p>{msg.text}</p>
//               </div>
//               {msg.role === "bot" && msg.source && (
//                 <p className="text-xs text-gray-500 mt-1">
//                   Source: {msg.source === "rag" ? "RAG-based Knowledge" : "LLM Response"}
//                 </p>
//               )}
//             </div>
//           </div>
//         ))}

//         {/* Show Loading State */}
//         {mutation.isPending && (
//           <div className="flex justify-start">
//             <div className="p-3 bg-gray-100 text-gray-800 rounded-lg max-w-xs shadow-md flex items-center gap-2">
//               <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
//               <p>Thinking...</p>
//             </div>
//           </div>
//         )}
//         <div ref={chatEndRef}></div>
//       </div>

//       {/* Chat Input */}
//       <div className="flex items-center border-t p-3 bg-gray-50">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 p-2 rounded-md outline-none border"
//           placeholder="Type your message..."
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <button
//           onClick={handleSendMessage}
//           className="ml-3 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 flex items-center"
//           disabled={mutation.isPending}
//         >
//           {mutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
//         </button>
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { Send, Loader2, MessageSquare } from "lucide-react";

// // Use API BASE URL from environment variables
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// type MessageType = {
//   role: "user" | "bot";
//   text: string;
//   source?: "Direct LLM" | "RAG (Vector Search)";
// };

// export default function ChatInterface() {
//   const [messages, setMessages] = useState<MessageType[]>([]);
//   const [input, setInput] = useState("");
//   const chatEndRef = useRef<HTMLDivElement | null>(null);

//   // API Call for AI Response using XHR
//   const mutation = useMutation({
//     mutationFn: async (message: string) => {
//       if (!BASE_URL) throw new Error("Backend URL is missing in environment variables");

//       return new Promise<{ reply: string; source: "Direct LLM" | "RAG (Vector Search)" }>((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open("POST", `${BASE_URL}/documents/query/`, true);
//         xhr.setRequestHeader("Content-Type", "application/json");

//         xhr.onload = () => {
//           if (xhr.status >= 200 && xhr.status < 300) {
//             const response = JSON.parse(xhr.responseText);
//             resolve(response);
//           } else {
//             reject(new Error(`Request failed with status: ${xhr.status}`));
//           }
//         };

//         xhr.onerror = () => reject(new Error("Network error occurred"));
//         xhr.send(JSON.stringify({ query: message }));
//       });
//     },
//     onSuccess: (data) => {
//       setMessages((prev) => [
//         ...prev,
//         { role: "bot", text: data.reply, source: data.source },
//       ]);
//     },
//   });

//   const handleSendMessage = () => {
//     if (!input.trim()) return;

//     // Add User Message
//     const userMessage: MessageType = { role: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");

//     // Trigger API Call
//     mutation.mutate(input);
//   };

//   // Auto-scroll to latest message
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex flex-col w-full max-w-2xl h-[500px] border rounded-lg shadow-lg bg-white">
//       {/* Chat Messages Box */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {messages.length === 0 && (
//           <p className="text-gray-500 text-center">Ask me anything...</p>
//         )}
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-3 rounded-lg max-w-xs ${
//               msg.role === "user"
//                 ? "bg-blue-500 text-white ml-auto"
//                 : "bg-gray-200 text-gray-800"
//             }`}
//           >
//             <p>{msg.text}</p>
//             {msg.role === "bot" && msg.source && (
//               <span className="text-xs text-gray-500 mt-1 block">
//                 Source: {msg.source === "Direct LLM" ? "🤖 LLM" : "📚 RAG"}
//               </span>
//             )}
//           </div>
//         ))}
//         {/* Loading Indicator */}
//         {mutation.isPending && (
//           <div className="p-3 bg-gray-200 text-gray-800 rounded-lg max-w-xs">
//             <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" /> Thinking...
//           </div>
//         )}
//         <div ref={chatEndRef}></div>
//       </div>

//       {/* Chat Input Box */}
//       <div className="flex items-center border-t p-3">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 p-2 border rounded-md outline-none"
//           placeholder="Type your message..."
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <button
//           onClick={handleSendMessage}
//           className="ml-3 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 flex items-center"
//           disabled={mutation.isPending}
//         >
//           {mutation.isPending ? (
//             <Loader2 className="w-5 h-5 animate-spin" />
//           ) : (
//             <Send className="w-5 h-5" />
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { Send, Loader2, Bot, User } from "lucide-react";

// // Use API BASE URL from environment variables
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// type MessageType = {
//   role: "user" | "bot";
//   text: string;
//   source?: "Direct LLM" | "RAG (Vector Search)";
//   timestamp?: string;
// };

// export default function ChatInterface() {
//   const [messages, setMessages] = useState<MessageType[]>([]);
//   const [input, setInput] = useState("");
//   const chatEndRef = useRef<HTMLDivElement | null>(null);

//   // API Call for AI Response using XHR
//   const mutation = useMutation({
//     mutationFn: async (message: string) => {
//       if (!BASE_URL) throw new Error("Backend URL is missing in environment variables");

//       return new Promise<{ reply: string; source: "Direct LLM" | "RAG (Vector Search)" }>(
//         (resolve, reject) => {
//           const xhr = new XMLHttpRequest();
//           xhr.open("POST", `${BASE_URL}/documents/query/`, true);
//           xhr.setRequestHeader("Content-Type", "application/json");

//           xhr.onload = () => {
//             if (xhr.status >= 200 && xhr.status < 300) {
//               const response = JSON.parse(xhr.responseText);
//               resolve(response);
//             } else {
//               reject(new Error(`Request failed with status: ${xhr.status}`));
//             }
//           };

//           xhr.onerror = () => reject(new Error("Network error occurred"));
//           xhr.send(JSON.stringify({ query: message }));
//         }
//       );
//     },
//     onSuccess: (data) => {
//       const botMessage: MessageType = {
//         role: "bot",
//         text: data.reply,
//         source: data.source,
//         timestamp: new Date().toLocaleTimeString(),
//       };
//       setMessages((prev) => [...prev, botMessage]);
//     },
//   });

//   const handleSendMessage = () => {
//     if (!input.trim()) return;

//     // Add User Message
//     const userMessage: MessageType = {
//       role: "user",
//       text: input,
//       timestamp: new Date().toLocaleTimeString(),
//     };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");

//     // Trigger API Call
//     mutation.mutate(input);
//   };

//   // Auto-scroll to latest message
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex flex-col w-full max-w-3xl h-[600px] border rounded-lg shadow-xl bg-white">
//       {/* Chat Header */}
//       <div className="p-4 bg-blue-600 text-white text-lg font-semibold flex items-center justify-center">
//         AI Chat Assistant
//       </div>

//       {/* Chat Messages Box */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
//         {messages.length === 0 && (
//           <p className="text-gray-500 text-center">Ask me anything...</p>
//         )}
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               msg.role === "user" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`relative p-4 rounded-lg max-w-sm shadow-md ${
//                 msg.role === "user"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 text-gray-900"
//               }`}
//             >
//               {/* Message Text */}
//               <p>{msg.text}</p>
              
//               {/* Source (For Bot Messages) */}
//               {msg.role === "bot" && msg.source && (
//                 <span className="absolute bottom-1 right-2 text-xs text-gray-500">
//                   {msg.source === "Direct LLM" ? "🤖 LLM" : "📚 RAG"}
//                 </span>
//               )}

//               {/* Timestamp */}
//               <span
//                 className={`absolute bottom-1 left-2 text-xs ${
//                   msg.role === "user" ? "text-blue-200" : "text-gray-500"
//                 }`}
//               >
//                 {msg.timestamp}
//               </span>
//             </div>
//           </div>
//         ))}

//         {/* Loading Indicator */}
//         {mutation.isPending && (
//           <div className="flex justify-start">
//             <div className="p-3 bg-gray-200 text-gray-800 rounded-lg max-w-xs shadow-md">
//               <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" /> Thinking...
//             </div>
//           </div>
//         )}
//         <div ref={chatEndRef}></div>
//       </div>

//       {/* Chat Input Box */}
//       <div className="flex items-center border-t p-3 bg-white">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Type your message..."
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <button
//           onClick={handleSendMessage}
//           className="ml-3 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 flex items-center"
//           disabled={mutation.isPending}
//         >
//           {mutation.isPending ? (
//             <Loader2 className="w-6 h-6 animate-spin" />
//           ) : (
//             <Send className="w-6 h-6" />
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { Send, Loader2 } from "lucide-react";

// // Use API BASE URL from environment variables
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// type MessageType = {
//   role: "user" | "bot";
//   text: string;
//   source?: "Direct LLM" | "RAG (Vector Search)";
//   timestamp?: string;
// };

// export default function ChatInterface() {
//   const [messages, setMessages] = useState<MessageType[]>([]);
//   const [input, setInput] = useState("");
//   const chatEndRef = useRef<HTMLDivElement | null>(null);

//   // API Call for AI Response using XHR
//   const mutation = useMutation({
//     mutationFn: async (message: string) => {
//       if (!BASE_URL) throw new Error("Backend URL is missing in environment variables");

//       return new Promise<{ response: string; source: "Direct LLM" | "RAG (Vector Search)" }>(
//         (resolve, reject) => {
//           const xhr = new XMLHttpRequest();
//           xhr.open("POST", `${BASE_URL}/documents/query/`, true);
//           xhr.setRequestHeader("Content-Type", "application/json");

//           xhr.onload = () => {
//             if (xhr.status >= 200 && xhr.status < 300) {
//               const response = JSON.parse(xhr.responseText);
//               resolve(response);
//             } else {
//               reject(new Error(`Request failed with status: ${xhr.status}`));
//             }
//           };

//           xhr.onerror = () => reject(new Error("Network error occurred"));
//           xhr.send(JSON.stringify({ query: message }));
//         }
//       );
//     },
//     onSuccess: (data) => {
//       const botMessage: MessageType = {
//         role: "bot",
//         text: data.response, // ✅ FIXED: Show the actual response text
//         source: data.source, // ✅ Show the source from API
//         timestamp: new Date().toLocaleTimeString(),
//       };
//       setMessages((prev) => [...prev, botMessage]);
//     },
//   });

//   const handleSendMessage = () => {
//     if (!input.trim()) return;

//     // Add User Message
//     const userMessage: MessageType = {
//       role: "user",
//       text: input,
//       timestamp: new Date().toLocaleTimeString(),
//     };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");

//     // Trigger API Call
//     mutation.mutate(input);
//   };

//   // Auto-scroll to latest message
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex flex-col w-full max-w-3xl h-[600px] border rounded-lg shadow-xl bg-white">
//       {/* Chat Header */}
//       <div className="p-4 bg-blue-600 text-white text-lg font-semibold flex items-center justify-center">
//         AI Chat Assistant
//       </div>

//       {/* Chat Messages Box */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
//         {messages.length === 0 && (
//           <p className="text-gray-500 text-center">Ask me anything...</p>
//         )}
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`relative p-4 rounded-lg max-w-sm shadow-md ${
//                 msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
//               }`}
//             >
//               {/* Message Text */}
//               <p className="text-sm">{msg.text}</p>
              
//               {/* Source (For Bot Messages) */}
//               {msg.role === "bot" && msg.source && (
//                 <div className="mt-1 text-xs text-gray-600 flex items-center gap-1">
//                   {msg.source === "Direct LLM" ? "🤖 LLM" : "📚 RAG"}
//                 </div>
//               )}

//               {/* Timestamp */}
//               <span
//                 className={`absolute bottom-1 right-2 text-xs  ${
//                   msg.role === "user" ? "text-blue-200" : "text-gray-500"
//                 }`}
//               >
//                 {msg.timestamp}
//               </span>
//             </div>
//           </div>
//         ))}

//         {/* Loading Indicator */}
//         {mutation.isPending && (
//           <div className="flex justify-start">
//             <div className="p-3 bg-gray-200 text-gray-800 rounded-lg max-w-xs shadow-md">
//               <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" /> Thinking...
//             </div>
//           </div>
//         )}
//         <div ref={chatEndRef}></div>
//       </div>

//       {/* Chat Input Box */}
//       <div className="flex items-center border-t p-3 bg-white">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Type your message..."
//           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <button
//           onClick={handleSendMessage}
//           className="ml-3 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 flex items-center"
//           disabled={mutation.isPending}
//         >
//           {mutation.isPending ? (
//             <Loader2 className="w-6 h-6 animate-spin" />
//           ) : (
//             <Send className="w-6 h-6" />
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Send, Loader2 } from "lucide-react";

// Use API BASE URL from environment variables
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type MessageType = {
  role: "user" | "bot";
  text: string;
  source?: "Direct LLM" | "RAG (Vector Search)";
  timestamp?: string;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // API Call for AI Response using XHR
  const mutation = useMutation({
    mutationFn: async (message: string) => {
      if (!BASE_URL) throw new Error("Backend URL is missing in environment variables");

      return new Promise<{ response: string; source: "Direct LLM" | "RAG (Vector Search)" }>(
        (resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("POST", `${BASE_URL}/documents/query/`, true);
          xhr.setRequestHeader("Content-Type", "application/json");

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } else {
              reject(new Error(`Request failed with status: ${xhr.status}`));
            }
          };

          xhr.onerror = () => reject(new Error("Network error occurred"));
          xhr.send(JSON.stringify({ query: message }));
        }
      );
    },
    onSuccess: (data) => {
      const botMessage: MessageType = {
        role: "bot",
        text: data.response, // ✅ FIXED: Show the actual response text
        source: data.source, // ✅ Show the source from API
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    },
  });

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add User Message
    const userMessage: MessageType = {
      role: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Trigger API Call
    mutation.mutate(input);
  };

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-3xl h-[600px] border rounded-lg shadow-xl bg-white">
      {/* Chat Header */}
      <div className="p-4 bg-blue-600 text-white text-lg font-semibold flex items-center justify-center">
        AI Chat Assistant
      </div>

      {/* Chat Messages Box */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center">Ask me anything...</p>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`relative p-4 rounded-lg max-w-sm shadow-md ${
                msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
              }`}
            >
              {/* Message Text */}
              <p className="text-sm">{msg.text}</p>

              {/* Source (For Bot Messages) */}
              {msg.role === "bot" && msg.source && (
                <div className="mt-1 text-xs text-gray-600 flex items-center gap-1">
                  {msg.source === "Direct LLM" ? "🤖 LLM" : "📚 RAG"}
                </div>
              )}

              {/* Timestamp - Added Padding to Prevent Overlap */}
              <span
                className={`block pt-2  text-xs ${
                  msg.role === "user" ? "text-blue-200" : "text-gray-500"
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {mutation.isPending && (
          <div className="flex justify-start">
            <div className="p-3 bg-gray-200 text-gray-800 rounded-lg max-w-xs shadow-md">
              <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" /> Thinking...
            </div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      {/* Chat Input Box */}
      <div className="flex items-center border-t p-3 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="ml-3 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 flex items-center"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}
