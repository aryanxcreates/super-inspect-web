"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-3 bg-white border border-zinc-200 rounded-lg text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check size={18} className="text-green-600" />
      ) : (
        <Copy size={18} />
      )}
    </button>
  );
}
