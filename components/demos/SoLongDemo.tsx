"use client";

import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Trophy, Heart, Coins, Skull } from "lucide-react";

type Cell = "wall" | "empty" | "player" | "collectible" | "exit" | "enemy";
type Position = { x: number; y: number };

const INITIAL_MAP = [
  ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ["wall", "player", "empty", "collectible", "empty", "enemy", "wall"],
  ["wall", "empty", "wall", "wall", "collectible", "empty", "wall"],
  ["wall", "collectible", "empty", "empty", "wall", "empty", "wall"],
  ["wall", "empty", "wall", "empty", "empty", "exit", "wall"],
  ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
] as Cell[][];

export default function SoLongDemo() {
  const router = useRouter();
  const [map, setMap] = useState<Cell[][]>([]);
  const [playerPos, setPlayerPos] = useState<Position>({ x: 1, y: 1 });
  const [collectibles, setCollectibles] = useState<Position[]>([]);
  const [collected, setCollected] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [enemyPos, setEnemyPos] = useState<Position>({ x: 5, y: 1 });

  const initializeGame = () => {
    const newMap = INITIAL_MAP.map((row) => [...row]) as Cell[][];
    setMap(newMap);

    const cols: Position[] = [];
    for (let y = 0; y < newMap.length; y++) {
      for (let x = 0; x < newMap[y].length; x++) {
        if (newMap[y][x] === "collectible") cols.push({ x, y });
        if (newMap[y][x] === "player") setPlayerPos({ x, y });
        if (newMap[y][x] === "enemy") setEnemyPos({ x, y });
      }
    }
    setCollectibles(cols);
    setCollected(0);
    setMoves(0);
    setGameOver(false);
    setVictory(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver || victory) return;

      let newX = playerPos.x;
      let newY = playerPos.y;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          newY--;
          break;
        case "ArrowDown":
        case "s":
        case "S":
          newY++;
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          newX--;
          break;
        case "ArrowRight":
        case "d":
        case "D":
          newX++;
          break;
        default:
          return;
      }

      if (map[newY]?.[newX] === "wall") return;

      const newPos = { x: newX, y: newY };
      setPlayerPos(newPos);
      setMoves((m) => m + 1);

      // Check collectible
      const collIndex = collectibles.findIndex(
        (c) => c.x === newX && c.y === newY
      );
      if (collIndex !== -1) {
        const newColl = collectibles.filter((_, i) => i !== collIndex);
        setCollectibles(newColl);
        setCollected((c) => c + 1);

        // Check if all collectibles gathered and on exit
        if (newColl.length === 0 && map[newY][newX] === "exit") {
          setVictory(true);
        }
      }

      // Check enemy collision
      if (newX === enemyPos.x && newY === enemyPos.y) {
        setGameOver(true);
      }

      // Check exit with all collectibles
      if (map[newY][newX] === "exit" && collectibles.length === 0) {
        setVictory(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [playerPos, map, collectibles, gameOver, victory, enemyPos]);

  const getCellSymbol = (cell: Cell, x: number, y: number) => {
    if (playerPos.x === x && playerPos.y === y) return "🧑";
    if (enemyPos.x === x && enemyPos.y === y) return "👾";
    if (collectibles.some((c) => c.x === x && c.y === y)) return "🪙";

    switch (cell) {
      case "wall":
        return "🟫";
      case "exit":
        return "🚪";
      case "empty":
        return "⬜";
      default:
        return "⬜";
    }
  };

  const totalCollectibles = collected + collectibles.length;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-4xl space-y-4">
        {/* Botão Back */}
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-mono">so_long Game</CardTitle>
            <CardDescription>
              A 2D game where you must collect all coins and reach the exit
              while avoiding enemies. Use arrow keys or WASD to move around the
              map.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="px-3 py-1.5 text-sm bg-muted"
                >
                  <Coins className="w-4 h-4 mr-2 text-yellow-500" />
                  {collected} / {totalCollectibles}
                </Badge>
                <Badge
                  variant="outline"
                  className="px-3 py-1.5 text-sm bg-muted"
                >
                  Moves: {moves}
                </Badge>
                {!gameOver && !victory && (
                  <Badge className="bg-green-500/20 text-green-500 border-green-500/30 px-3 py-1.5">
                    <Heart className="w-4 h-4 mr-2" />
                    Alive
                  </Badge>
                )}
                {gameOver && (
                  <Badge className="bg-red-500/20 text-red-500 border-red-500/30 px-3 py-1.5">
                    <Skull className="w-4 h-4 mr-2" />
                    Dead
                  </Badge>
                )}
                {victory && (
                  <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 px-3 py-1.5">
                    <Trophy className="w-4 h-4 mr-2" />
                    Victory!
                  </Badge>
                )}
              </div>
              <Button onClick={initializeGame} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            <div className="relative">
              <div className="inline-block p-6 rounded-xl bg-muted/50 border border-border/50">
                {map.map((row, y) => (
                  <div key={y} className="flex">
                    {row.map((cell, x) => (
                      <div
                        key={`${x}-${y}`}
                        className="w-10 h-10 flex items-center justify-center text-2xl"
                      >
                        {getCellSymbol(cell, x, y)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {gameOver && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-xl backdrop-blur-sm">
                  <div className="text-center space-y-4">
                    <Skull className="w-16 h-16 text-red-400 mx-auto" />
                    <p className="text-2xl font-bold text-red-400">
                      Game Over!
                    </p>
                    <p className="text-muted-foreground">
                      You collided with an enemy
                    </p>
                    <Button onClick={initializeGame}>Try Again</Button>
                  </div>
                </div>
              )}

              {victory && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-xl backdrop-blur-sm">
                  <div className="text-center space-y-4">
                    <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
                    <p className="text-2xl font-bold text-accent">Victory!</p>
                    <p className="text-muted-foreground">
                      Completed in {moves} moves
                    </p>
                    <Button onClick={initializeGame}>Play Again</Button>
                  </div>
                </div>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 bg-muted/50 rounded-md">
                <Label className="text-sm font-semibold mb-2 block">
                  Controls
                </Label>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>
                    <kbd className="px-2 py-1 bg-background rounded text-xs">
                      ↑ W
                    </kbd>{" "}
                    Move up
                  </p>
                  <p>
                    <kbd className="px-2 py-1 bg-background rounded text-xs">
                      ↓ S
                    </kbd>{" "}
                    Move down
                  </p>
                  <p>
                    <kbd className="px-2 py-1 bg-background rounded text-xs">
                      ← A
                    </kbd>{" "}
                    Move left
                  </p>
                  <p>
                    <kbd className="px-2 py-1 bg-background rounded text-xs">
                      → D
                    </kbd>{" "}
                    Move right
                  </p>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-md">
                <Label className="text-sm font-semibold mb-2 block">
                  Objective
                </Label>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Collect all coins 🪙 and reach the exit 🚪. Avoid enemies 👾
                  or you'll lose the game!
                </p>
              </div>
            </div>

            {(gameOver || victory) && (
              <div className="text-center text-sm text-muted-foreground">
                <p>
                  Collected: {collected}/{totalCollectibles} coins | Total
                  moves: {moves}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-bold mb-3">About the Project</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            so_long is a project that introduces graphic programming and game
            development. It uses the MiniLibX library to render sprites and
            handle keyboard events. The game implements collision logic, state
            management, map parsing, and a complete game loop. This project
            teaches fundamental concepts of 2D game development and event-driven
            programming.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">
              C
            </span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">
              MiniLibX
            </span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">
              Game Dev
            </span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">
              2D Graphics
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
