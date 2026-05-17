import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding font-button-label font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-dark-charcoal/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-error aria-invalid:ring-2 aria-invalid:ring-error/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-dark-charcoal text-canvas-white hover:bg-rich-black rounded-nav-items",
        outline:
          "border-outline-variant bg-transparent text-dark-charcoal hover:bg-ash-gray/50 rounded-nav-items",
        secondary:
          "bg-cofounder-blue text-canvas-white hover:bg-cofounder-blue/90 rounded-nav-items",
        ghost:
          "bg-transparent text-slate-gray hover:bg-ash-gray/50 hover:text-dark-charcoal rounded-nav-pill",
        destructive:
          "bg-transparent text-error border border-error/50 hover:bg-error/10 rounded-sm",
        link: "text-cofounder-blue underline-offset-4 hover:underline",
        solid: "bg-night-sky text-canvas-white border border-rich-black rounded-nav-items py-[7px] pb-[8px] pl-4 pr-3 hover:bg-rich-black",
        outlined: "bg-transparent text-dark-charcoal border border-action-azure rounded-sm hover:bg-ash-gray/50",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-sm px-2 text-xs in-data-[slot=button-group]:rounded-nav-items has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-nav-items px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-nav-items has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-sm in-data-[slot=button-group]:rounded-nav-items [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-nav-items in-data-[slot=button-group]:rounded-nav-items",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
