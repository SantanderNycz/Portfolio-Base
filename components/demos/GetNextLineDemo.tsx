"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function GetNextLineDemo() {
  const router = useRouter();
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
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-2xl space-y-4">
        {/* Botão Back */}
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-mono">get_next_line Simulator</CardTitle>
            <CardDescription>
              Simulates reading a file line by line. Click "Read Next Line" to
              see each line sequentially. Useful for testing line parsing
              functionality in C projects.
            </CardDescription>
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
              <Button
                onClick={readNextLine}
                disabled={currentLine >= lines.length}
              >
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
        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-bold mb-3">About the Project</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The get_next_line project teaches file I/O operations and buffer
            management in C. The function must read from a file descriptor line
            by line, handling various buffer sizes and edge cases. It's
            particularly useful for parsing configuration files or processing
            large text files efficiently.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">
              C
            </span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">
              File I/O
            </span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">
              Static Variables
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
