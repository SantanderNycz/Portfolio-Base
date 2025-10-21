import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PushSwapDemo } from "@/components/demos/PushSwapDemo"
import { ArrowLeft } from "lucide-react"

export default function PushSwapPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/projects">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 font-mono">push_swap</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A sorting algorithm using two stacks and a limited set of operations. The goal is to sort numbers in
            ascending order with the minimum number of moves.
          </p>
        </div>

        <PushSwapDemo />

        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-bold mb-3">About the Project</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The push_swap project is an algorithm challenge that requires sorting data using two stacks with a limited
            set of operations. The operations include swap (sa, sb), push (pa, pb), rotate (ra, rb), and reverse rotate
            (rra, rrb). The challenge is to find an efficient algorithm that minimizes the number of operations needed
            to sort the stack.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">C</span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">Algorithms</span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">Sorting</span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">Optimization</span>
          </div>
        </div>
      </div>
    </div>
  )
}
