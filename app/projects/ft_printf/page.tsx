import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FtPrintfDemo } from "@/components/demos/FtPrintfDemo"
import { ArrowLeft } from "lucide-react"

export default function FtPrintfPage() {
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
          <h1 className="text-4xl font-bold mb-4 font-mono">ft_printf</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A recreation of the standard printf function with support for multiple format specifiers including strings,
            integers, characters, hexadecimal, and pointers.
          </p>
        </div>

        <FtPrintfDemo />

        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-bold mb-3">About the Project</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The ft_printf project involves recreating the printf function from the C standard library. This requires
            understanding variadic functions, format string parsing, and type conversions. The implementation must
            handle various format specifiers (%c, %s, %p, %d, %i, %u, %x, %X, %%) and produce output identical to the
            original printf.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">C</span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">
              Variadic Functions
            </span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">Format Parsing</span>
          </div>
        </div>
      </div>
    </div>
  )
}
