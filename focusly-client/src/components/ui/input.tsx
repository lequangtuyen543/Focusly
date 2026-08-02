import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "w-full min-w-0 bg-rich-black/60 border border-outline-variant/20 text-canvas-white font-body text-body px-4 py-3 rounded-none transition-all outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-canvas-white placeholder:text-cool-gray focus-visible:border-cofounder-blue focus-visible:ring-1 focus-visible:ring-cofounder-blue disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-rich-black/40 disabled:opacity-50 aria-invalid:border-error aria-invalid:ring-2 aria-invalid:ring-error/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
