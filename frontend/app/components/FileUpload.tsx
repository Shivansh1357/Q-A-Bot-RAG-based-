// "use client";

// import { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { UploadCloud } from "lucide-react";
// import { useMutation } from "@tanstack/react-query";

// // Use NEXT_PUBLIC_BASE_URL from environment variables
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export default function FileUpload() {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);

//   const mutation = useMutation({
//     mutationFn: async (file: File) => {
//       if (!BASE_URL) throw new Error("Backend URL is missing in environment variables");

//       const formData = new FormData();
//       formData.append("file", file);

//       return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open("POST", `${BASE_URL}/documents/upload/`, true);

//         xhr.upload.onprogress = (event) => {
//           if (event.lengthComputable) {
//             setUploadProgress(Math.round((event.loaded * 100) / event.total));
//           }
//         };

//         xhr.onload = () => {
//           if (xhr.status >= 200 && xhr.status < 300) {
//             resolve(JSON.parse(xhr.responseText));
//           } else {
//             reject(new Error(`Upload failed with status: ${xhr.status}`));
//           }
//         };

//         xhr.onerror = () => reject(new Error("Network error occurred during upload"));
//         xhr.send(formData);
//       });
//     },
//     onSuccess: () => {
//       setUploadSuccess(true);
//       setUploadProgress(100);
//     },
//     onError: () => {
//       setUploadSuccess(false);
//       setUploadProgress(0);
//     },
//   });

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: { "application/pdf": [".pdf"] },
//     maxFiles: 1,
//     onDrop: (acceptedFiles) => {
//       setFile(acceptedFiles[0]);
//       setUploadProgress(0);
//       setUploadSuccess(null);
//     },
//   });

//   return (
//     <div className="w-full max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white">
//       {/* File Drop Area */}
//       <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-6 text-center cursor-pointer rounded-lg hover:border-gray-500">
//         <input {...getInputProps()} />
//         <UploadCloud className="mx-auto mb-2 w-12 h-12 text-gray-400" />
//         <p className="text-sm text-gray-600">Drag & drop a PDF file here, or click to select one</p>
//       </div>

//       {/* Selected File Info */}
//       {file && (
//         <div className="mt-4 text-center">
//           <p className="text-gray-700">Selected File: {file.name}</p>
//           {/* Upload Progress */}
//           {uploadProgress > 0 && (
//             <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
//               <div
//                 className="bg-blue-600 h-2.5 rounded-full"
//                 style={{ width: `${uploadProgress}%` }}
//               ></div>
//             </div>
//           )}

//           {/* Upload Button */}
//           <button 
//             onClick={() => mutation.mutate(file)} 
//             disabled={mutation.status === "pending"} 
//             className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//           >
//             {mutation.status === "pending" ? `Uploading... ${uploadProgress}%` : "Upload File"}
//           </button>

//           {/* Success / Error Messages */}
//           {uploadSuccess !== null && (
//             <p className={`mt-2 text-sm ${uploadSuccess ? "text-green-600" : "text-red-600"}`}>
//               {uploadSuccess ? "Upload successful!" : "Upload failed. Try again."}
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

// Use NEXT_PUBLIC_BASE_URL from environment variables
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      if (!BASE_URL) throw new Error("Backend URL is missing in environment variables");

      const formData = new FormData();
      formData.append("file", file);

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${BASE_URL}/documents/upload/`, true);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            setUploadProgress(Math.round((event.loaded * 100) / event.total));
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(`Upload failed with status: ${xhr.status}`));
          }
        };

        xhr.onerror = () => reject(new Error("Network error occurred during upload"));
        xhr.send(formData);
      });
    },
    onSuccess: () => {
      setUploadSuccess(true);
      setUploadProgress(100);
    },
    onError: () => {
      setUploadSuccess(false);
      setUploadProgress(0);
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setUploadProgress(0);
      setUploadSuccess(null);
    },
  });

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadSuccess(null);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      {/* File Drop Area */}
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-400 p-8 text-center cursor-pointer rounded-lg hover:border-gray-600 transition duration-200"
      >
        <input {...getInputProps()} />
        <UploadCloud className="mx-auto mb-2 w-14 h-14 text-gray-500" />
        <p className="text-sm text-gray-600 font-medium">Drag & drop a PDF file here</p>
        <p className="text-xs text-gray-400">or click to browse</p>
      </div>

      {/* Selected File Info */}
      {file && (
        <div className="mt-5 p-4 bg-gray-100 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <p className="text-gray-700 text-sm font-semibold">{file.name}</p>
            <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(2)} KB)</span>
          </div>
          <button onClick={handleRemoveFile} className="text-gray-600 hover:text-red-500">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Upload Progress */}
      {uploadProgress > 0 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-1">{uploadProgress}% completed</p>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={() => mutation.mutate(file as File)}
        disabled={!file || mutation.status === "pending"}
        className={`mt-4 w-full py-3 rounded-lg font-semibold text-white transition duration-200 ${
          !file
            ? "bg-gray-300 cursor-not-allowed"
            : mutation.status === "pending"
            ? "bg-blue-400"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {mutation.status === "pending" ? `Uploading... ${uploadProgress}%` : "Upload File"}
      </button>

      {/* Success / Error Messages */}
      {uploadSuccess !== null && (
        <div className="mt-4 flex items-center justify-center gap-2 text-sm">
          {uploadSuccess ? (
            <span className="text-green-600 flex items-center gap-1">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Upload successful!
            </span>
          ) : (
            <span className="text-red-600 flex items-center gap-1">
              <XCircle className="w-5 h-5 text-red-500" />
              Upload failed. Try again.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
