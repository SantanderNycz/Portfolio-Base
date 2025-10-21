"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function FtPrintfDemo() {
  const [formatString, setFormatString] = useState(
    "Hello %s, you have %d new messages!"
  );
  const [stringArg, setStringArg] = useState("User");
  const [numberArg, setNumberArg] = useState("42");
  const [output, setOutput] = useState("");

  const executeFormat = () => {
    let result = formatString;

    // Simple implementation of format string replacement
    result = result.replace("%s", stringArg);
    result = result.replace("%d", numberArg);
    result = result.replace("%i", numberArg);
    result = result.replace("%c", stringArg.charAt(0));
    result = result.replace("%x", Number.parseInt(numberArg).toString(16));
    result = result.replace(
      "%X",
      Number.parseInt(numberArg).toString(16).toUpperCase()
    );
    result = result.replace("%%", "%");

    setOutput(result);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-2xl">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-mono">ft_printf Formatter</CardTitle>
            <CardDescription>
              Test printf-style format strings with various specifiers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="format-string">Format String</Label>
              <Input
                id="format-string"
                value={formatString}
                onChange={(e) => setFormatString(e.target.value)}
                placeholder="Enter format string..."
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Supported: %s (string), %d/%i (integer), %c (char), %x/%X (hex),
                %% (percent)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="string-arg">String Argument (%s)</Label>
                <Input
                  id="string-arg"
                  value={stringArg}
                  onChange={(e) => setStringArg(e.target.value)}
                  placeholder="String value"
                  className="font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="number-arg">Number Argument (%d)</Label>
                <Input
                  id="number-arg"
                  type="number"
                  value={numberArg}
                  onChange={(e) => setNumberArg(e.target.value)}
                  placeholder="Number value"
                  className="font-mono"
                />
              </div>
            </div>

            <Button onClick={executeFormat} className="w-full">
              Format String
            </Button>

            <div className="space-y-2">
              <Label>Output</Label>
              <div className="p-4 bg-muted rounded-md font-mono text-sm min-h-[60px] flex items-center">
                {output || 'Click "Format String" to see output...'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
