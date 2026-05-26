"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, UploadCloud, CheckCircle } from "lucide-react";

export default function ReceiptScanner() {
  const [scanning, setScanning] = useState(false);
  const [extracted, setExtracted] = useState<any>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files?.[0];
    if (!targetFile) return;

    setScanning(true);
    const reader = new FileReader();
    reader.readAsDataURL(targetFile);
    reader.onloadend = async () => {
      const base64Content = (reader.result as string).split(",")[1];
      try {
        const response = await fetch("/api/ai/scan-receipt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64: base64Content, mimeType: targetFile.type }),
        });
        const parseResult = await response.json();
        setExtracted(parseResult.data);
      } catch (err) {
        console.error("Scanning error:", err);
      } finally {
        setScanning(false);
      }
    };
  };

  return (
    <Card className="border-dashed border-neutral-800 bg-neutral-950 text-neutral-200">
      <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-neutral-800 border-dashed rounded-lg cursor-pointer hover:bg-neutral-900 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {scanning ? <Loader2 className="w-10 h-10 animate-spin text-emerald-500" /> : <UploadCloud className="w-10 h-10 text-neutral-500" />}
            <p className="mt-2 text-sm text-neutral-400 font-medium">
              {scanning ? "Processing Document Engine..." : "Upload receipt image to auto-scan details"}
            </p>
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={scanning} />
        </label>

        {extracted && (
          <div className="w-full p-4 bg-neutral-900 rounded-md border border-neutral-800 space-y-2 text-sm">
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold mb-2">
              <CheckCircle size={16} /><span>Parsing Complete</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <span className="text-neutral-400">Merchant Name:</span><span className="text-right font-medium">{extracted.merchantName}</span>
              <span className="text-neutral-400">Total Volume:</span><span className="text-right font-medium text-emerald-400">${extracted.amount}</span>
              <span className="text-neutral-400">Classification:</span><span className="text-right font-medium">{extracted.category}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}