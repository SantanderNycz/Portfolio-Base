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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Send, Server, Users, RotateCcw } from "lucide-react";

export default function MinitalkDemo() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [transmitting, setTransmitting] = useState(false);
  const [receivedMessage, setReceivedMessage] = useState("");
  const [binarySequence, setBinarySequence] = useState<string[]>([]);
  const [signalCount, setSignalCount] = useState(0);

  const stringToBinary = (str: string) => {
    return str
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"));
  };

  const simulateTransmission = async () => {
    if (!message.trim()) return;

    setTransmitting(true);
    setReceivedMessage("");
    setSignalCount(0);

    const binary = stringToBinary(message);
    setBinarySequence(binary);

    let receivedBinary = "";
    let totalSignals = 0;

    for (const charBinary of binary) {
      for (const bit of charBinary) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        receivedBinary += bit;
        totalSignals++;
        setSignalCount(totalSignals);

        if (receivedBinary.length === 8) {
          const char = String.fromCharCode(Number.parseInt(receivedBinary, 2));
          setReceivedMessage((prev) => prev + char);
          receivedBinary = "";
        }
      }
    }

    setTransmitting(false);
  };

  const reset = () => {
    setMessage("");
    setReceivedMessage("");
    setBinarySequence([]);
    setSignalCount(0);
    setTransmitting(false);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-4xl space-y-4">
        {/* Botão Back */}
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-mono">minitalk Simulator</CardTitle>
            <CardDescription>
              Simulates client-server communication using UNIX signals. The
              client converts messages to binary and transmits them bit by bit
              using SIGUSR1 (0) and SIGUSR2 (1) signals to the server.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Cliente */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <Label className="text-base font-semibold">Client</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minitalk-input">Message to send</Label>
                  <Input
                    id="minitalk-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    disabled={transmitting}
                    className="font-mono bg-muted"
                  />
                </div>

                <Button
                  onClick={simulateTransmission}
                  disabled={transmitting || !message.trim()}
                  className="w-full"
                  size="sm"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {transmitting ? "Sending..." : "Send Message"}
                </Button>

                {binarySequence.length > 0 && (
                  <div className="p-3 rounded-lg bg-muted border border-border/30">
                    <p className="text-xs text-muted-foreground mb-2">
                      Binary signals:
                    </p>
                    <div className="font-mono text-xs text-primary break-all leading-relaxed">
                      {binarySequence.join(" ")}
                    </div>
                  </div>
                )}
              </div>

              {/* Servidor */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-accent" />
                  <Label className="text-base font-semibold">Server</Label>
                  <Badge className="bg-accent/20 text-accent border-accent/30">
                    PID: 42424
                  </Badge>
                </div>

                <div className="space-y-2">
                  <Label>Received message</Label>
                  <div className="min-h-[42px] p-3 rounded-lg bg-muted border border-border/30 font-mono flex items-center">
                    {receivedMessage || (
                      <span className="text-muted-foreground text-sm">
                        Waiting for signals...
                      </span>
                    )}
                  </div>
                </div>

                {transmitting && (
                  <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                      <p className="text-sm font-semibold text-accent">
                        Receiving signals...
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Decoding bits (SIGUSR1 = 0, SIGUSR2 = 1)
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-muted-foreground">Signals sent: </span>
                <span className="font-mono font-bold">{signalCount}</span>
                {receivedMessage && !transmitting && (
                  <span className="ml-4 text-green-500 font-bold">
                    ✓ Complete!
                  </span>
                )}
              </div>
              <Button onClick={reset} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            <div className="p-3 bg-muted/50 rounded-md">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">How it works:</strong> The
                client converts each character to binary (8 bits) and sends it
                through UNIX signals (SIGUSR1 for '0' and SIGUSR2 for '1'). The
                server receives the signals, reconstructs the bits, and decodes
                the characters.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-bold mb-3">About the Project</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Minitalk explores inter-process communication using UNIX signals.
            The server receives a PID and waits for messages, while the client
            converts text into binary sequences and sends each bit using
            signals. This project demonstrates fundamental concepts of systems
            programming, process management, and inter-process communication
            (IPC).
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">
              C
            </span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">
              UNIX Signals
            </span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">
              IPC
            </span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">
              Bit Manipulation
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
