// "use client";

// import { useState } from "react";
// import FileUpload from "./components/FileUpload";
// import ChatInterface from "./components/ChatInterface";

// export default function MainLayout() {
//   const [activeTab, setActiveTab] = useState("upload");

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
//       <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-2xl font-bold text-center mb-4">
//           AI Knowledge Base & Chatbot
//         </h1>
//         <div className="flex justify-center mb-4 border-b pb-2 space-x-4">
//           <button
//             className={`px-4 py-2 ${
//               activeTab === "upload"
//                 ? "border-b-2 border-black font-bold"
//                 : "text-gray-600"
//             }`}
//             onClick={() => setActiveTab("upload")}
//           >
//             Upload Documents
//           </button>
//           <button
//             className={`px-4 py-2 ${
//               activeTab === "chat"
//                 ? "border-b-2 border-black font-bold"
//                 : "text-gray-600"
//             }`}
//             onClick={() => setActiveTab("chat")}
//           >
//             Chat with AI
//           </button>
//         </div>

//         {activeTab === "upload" && <FileUpload />}
//         {activeTab === "chat" && <ChatInterface />}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import FileUpload from "./components/FileUpload";
import ChatInterface from "./components/ChatInterface";
import { UploadCloud, MessageSquare } from "lucide-react";

export default function MainLayout() {
  const [activeTab, setActiveTab] = useState<"upload" | "chat">("upload");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-900 p-6">
      {/* Container Box */}
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-xl p-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          {/* Neural Nexus: AI-Powered Q&A & Knowledge Engine */}
          Neural Nexus: Intelligent Q&A & Knowledge Engine
        </h1>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-6 border-b border-gray-300">
          <button
            className={`flex items-center gap-2 px-6 py-3 text-lg font-medium transition-all ${
              activeTab === "upload"
                ? "border-b-4 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("upload")}
          >
            <UploadCloud className="w-5 h-5" />
            Upload Documents
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-3 text-lg font-medium transition-all ${
              activeTab === "chat"
                ? "border-b-4 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("chat")}
          >
            <MessageSquare className="w-5 h-5" />
            Chat with AI
          </button>
        </div>

        {/* Content Section */}
        <div className="mt-6">
          {activeTab === "upload" && <FileUpload />}
          {activeTab === "chat" && <ChatInterface />}
        </div>
      </div>
    </div>
  );
}
