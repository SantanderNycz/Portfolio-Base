"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RotateCcw } from "lucide-react";

export function GetNextLineDemo() {
  const defaultText = `Welcome to get_next_line demo!
This function reads one line at a time.
It handles multiple file descriptors.
Perfect for parsing files line by line.
Try clicking "Read Next Line" below!`;

  const [fileContent] = useState(defaultText);
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedLine, setDisplayedLine] = useState("");

  const lines = fileContent.split("\n");

  const readNextLine = () => {
    if (currentLine < lines.length) {
      setDisplayedLine(lines[currentLine]);
      setCurrentLine(currentLine + 1);
    } else {
      setDisplayedLine("EOF (End of File)");
    }
  };

  const reset = () => {
    setCurrentLine(0);
    setDisplayedLine("");
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-mono">get_next_line Simulator</CardTitle>
        <CardDescription>Simulates reading a file line by line</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>File Content (read-only)</Label>
          <Textarea
            value={fileContent}
            readOnly
            className="font-mono text-sm resize-none h-32 bg-muted"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={readNextLine} disabled={currentLine >= lines.length}>
            Read Next Line
          </Button>
          <Button onClick={reset} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Current Line (line {currentLine})</Label>
          <div className="p-4 bg-muted rounded-md font-mono text-sm min-h-[60px] flex items-center">
            {displayedLine || 'Click "Read Next Line" to start...'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
