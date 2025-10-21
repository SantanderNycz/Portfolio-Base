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
import { Label } from "@/components/ui/label";
import { RotateCcw } from "lucide-react";

export default function PushSwapDemo() {
  const router = useRouter();
  const [stackA, setStackA] = useState<number[]>([3, 2, 5, 1, 4]);
  const [stackB, setStackB] = useState<number[]>([]);
  const [operations, setOperations] = useState<string[]>([]);

  const addOperation = (op: string) => {
    setOperations([...operations, op]);
  };

  // Stack operations
  const sa = () => {
    if (stackA.length >= 2) {
      const newStack = [...stackA];
      [newStack[0], newStack[1]] = [newStack[1], newStack[0]];
      setStackA(newStack);
      addOperation("sa");
    }
  };

  const sb = () => {
    if (stackB.length >= 2) {
      const newStack = [...stackB];
      [newStack[0], newStack[1]] = [newStack[1], newStack[0]];
      setStackB(newStack);
      addOperation("sb");
    }
  };

  const pa = () => {
    if (stackB.length > 0) {
      setStackA([stackB[0], ...stackA]);
      setStackB(stackB.slice(1));
      addOperation("pa");
    }
  };

  const pb = () => {
    if (stackA.length > 0) {
      setStackB([stackA[0], ...stackA]);
      setStackA(stackA.slice(1));
      addOperation("pb");
    }
  };

  const ra = () => {
    if (stackA.length > 0) {
      setStackA([...stackA.slice(1), stackA[0]]);
      addOperation("ra");
    }
  };

  const rb = () => {
    if (stackB.length > 0) {
      setStackB([...stackB.slice(1), stackB[0]]);
      addOperation("rb");
    }
  };

  const rra = () => {
    if (stackA.length > 0) {
      setStackA([stackA[stackA.length - 1], ...stackA.slice(0, -1)]);
      addOperation("rra");
    }
  };

  const rrb = () => {
    if (stackB.length > 0) {
      setStackB([stackB[stackB.length - 1], ...stackB.slice(0, -1)]);
      addOperation("rrb");
    }
  };

  const reset = () => {
    setStackA([3, 2, 5, 1, 4]);
    setStackB([]);
    setOperations([]);
  };

  const isSorted =
    stackA.length > 0 &&
    stackB.length === 0 &&
    stackA.every((val, i, arr) => i === 0 || arr[i - 1] <= val);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-4xl space-y-4">
        {/* Botão Back */}
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-mono">push_swap Visualizer</CardTitle>
            <CardDescription>
              Visualizes sorting numbers using two stacks and a limited set of
              operations. Use the buttons below to manipulate the stacks and
              observe how the algorithm works step by step.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Stack A</Label>
                <div className="min-h-[200px] p-4 bg-muted rounded-md border-2 border-primary/30">
                  <div className="flex flex-col gap-2">
                    {stackA.map((num, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 bg-primary text-primary-foreground rounded font-mono text-center font-bold"
                      >
                        {num}
                      </div>
                    ))}
                    {stackA.length === 0 && (
                      <div className="text-muted-foreground text-center text-sm">
                        Empty
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Stack B</Label>
                <div className="min-h-[200px] p-4 bg-muted rounded-md border-2 border-accent/30">
                  <div className="flex flex-col gap-2">
                    {stackB.map((num, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 bg-accent text-accent-foreground rounded font-mono text-center font-bold"
                      >
                        {num}
                      </div>
                    ))}
                    {stackB.length === 0 && (
                      <div className="text-muted-foreground text-center text-sm">
                        Empty
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Operations</Label>
              <div className="grid grid-cols-4 gap-2">
                <Button
                  onClick={sa}
                  variant="outline"
                  size="sm"
                  className="font-mono bg-transparent"
                >
                  sa
                </Button>
                <Button
                  onClick={sb}
                  variant="outline"
                  size="sm"
                  className="font-mono bg-transparent"
                >
                  sb
                </Button>
                <Button
                  onClick={pa}
                  variant="outline"
                  size="sm"
                  className="font-mono bg-transparent"
                >
                  pa
                </Button>
                <Button
                  onClick={pb}
                  variant="outline"
                  size="sm"
                  className="font-mono bg-transparent"
                >
                  pb
                </Button>
                <Button
                  onClick={ra}
                  variant="outline"
                  size="sm"
                  className="font-mono bg-transparent"
                >
                  ra
                </Button>
                <Button
                  onClick={rb}
                  variant="outline"
                  size="sm"
                  className="font-mono bg-transparent"
                >
                  rb
                </Button>
                <Button
                  onClick={rra}
                  variant="outline"
                  size="sm"
                  className="font-mono bg-transparent"
                >
                  rra
                </Button>
                <Button
                  onClick={rrb}
                  variant="outline"
                  size="sm"
                  className="font-mono bg-transparent"
                >
                  rrb
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                s=swap, p=push, r=rotate, rr=reverse rotate
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-muted-foreground">Operations: </span>
                <span className="font-mono font-bold">{operations.length}</span>
                {isSorted && (
                  <span className="ml-4 text-green-500 font-bold">
                    ✓ Sorted!
                  </span>
                )}
              </div>
              <Button onClick={reset} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            {operations.length > 0 && (
              <div className="space-y-2">
                <Label>Operation History</Label>
                <div className="p-3 bg-muted rounded-md font-mono text-xs max-h-20 overflow-y-auto">
                  {operations.join(" ")}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-bold mb-3">About the Project</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The push_swap project is an algorithm challenge that requires
            sorting data using two stacks with a limited set of operations. The
            operations include swap (sa, sb), push (pa, pb), rotate (ra, rb),
            and reverse rotate (rra, rrb). The challenge is to find an efficient
            algorithm that minimizes the number of operations needed to sort the
            stack.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">
              C
            </span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">
              Algorithms
            </span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">
              Sorting
            </span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">
              Optimization
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
