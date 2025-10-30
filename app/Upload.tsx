import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";

export default function UploadButton() {
  const [fileName, setFileName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="file-upload">
        <Button asChild variant="outline" className="flex items-center gap-2">
          <span className="flex items-center gap-2 cursor-pointer">
            <Paperclip className="h-1 w-1" />
            Anexar arquivo
          </span>
        </Button>
      </label>

      <input
        id="file-upload"
        type="file"
        onChange={handleChange}
        className="hidden"
      />

      {fileName && (
        <p className="text-sm text-muted-foreground">
          📄 {fileName}
        </p>
      )}
    </div>
  );
}
