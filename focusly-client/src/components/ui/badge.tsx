import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-nav-pill border border-transparent px-2 py-0.5 text-caption font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-dark-charcoal/50 aria-invalid:border-error aria-invalid:ring-error/20 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-dark-charcoal text-canvas-white hover:bg-rich-black",
        secondary:
          "bg-cofounder-blue text-canvas-white hover:bg-cofounder-blue/90",
        destructive:
          "bg-transparent text-error border border-error/50 focus-visible:ring-error/20 hover:bg-error/10",
        outline:
          "border-outline-variant text-dark-charcoal hover:bg-ash-gray/50",
        ghost:
          "hover:bg-ash-gray/50 hover:text-dark-charcoal",
        link: "text-cofounder-blue underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
