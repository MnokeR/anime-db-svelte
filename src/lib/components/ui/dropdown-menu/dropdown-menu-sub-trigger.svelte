<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
  import ChevronRight from "lucide-svelte/icons/chevron-right";
  import { cn } from "$lib/utils.js";

  type Props = DropdownMenuPrimitive.SubTriggerProps & {
    inset?: boolean;
  };
  let {class: className, inset, children, ...rest}: Props = $props()
</script>

<DropdownMenuPrimitive.SubTrigger
  class={cn(
    "data-[highlighted]:bg-accent data-[state=open]:bg-accent data-[highlighted]:text-accent-foreground data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
    inset && "pl-8",
    className
  )}
  {...rest}
>
  {@render children?.()}
  <ChevronRight class="ml-auto h-4 w-4" />
</DropdownMenuPrimitive.SubTrigger>
