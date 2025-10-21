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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LibftDemo() {
  const [input, setInput] = useState("Hello 42!");
  const [selectedFunction, setSelectedFunction] = useState("ft_strlen");
  const [output, setOutput] = useState("");

  const executeFunction = (func: string, value: string) => {
    switch (func) {
      case "ft_strlen":
        setOutput(`Length: ${value.length}`);
        break;
      case "ft_toupper":
        setOutput(value.toUpperCase());
        break;
      case "ft_tolower":
        setOutput(value.toLowerCase());
        break;
      case "ft_isalpha":
        setOutput(
          value
            ? `${/^[a-zA-Z]+$/.test(value) ? "True" : "False"} (all alphabetic)`
            : "False"
        );
        break;
      case "ft_isdigit":
        setOutput(
          value
            ? `${/^\d+$/.test(value) ? "True" : "False"} (all digits)`
            : "False"
        );
        break;
      case "ft_strrev":
        setOutput(value.split("").reverse().join(""));
        break;
      default:
        setOutput("");
    }
  };

  const handleFunctionChange = (func: string) => {
    setSelectedFunction(func);
    executeFunction(func, input);
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    executeFunction(selectedFunction, value);
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-mono">libft Function Tester</CardTitle>
        <CardDescription>
          Test various libft functions with custom input
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="function-select">Select Function</Label>
          <Select value={selectedFunction} onValueChange={handleFunctionChange}>
            <SelectTrigger id="function-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ft_strlen">ft_strlen</SelectItem>
              <SelectItem value="ft_toupper">ft_toupper</SelectItem>
              <SelectItem value="ft_tolower">ft_tolower</SelectItem>
              <SelectItem value="ft_isalpha">ft_isalpha</SelectItem>
              <SelectItem value="ft_isdigit">ft_isdigit</SelectItem>
              <SelectItem value="ft_strrev">ft_strrev (bonus)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="input-text">Input</Label>
          <Input
            id="input-text"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter text..."
            className="font-mono"
          />
        </div>

        <div className="space-y-2">
          <Label>Output</Label>
          <div className="p-4 bg-muted rounded-md font-mono text-sm min-h-[60px] flex items-center">
            {output || "Result will appear here..."}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
