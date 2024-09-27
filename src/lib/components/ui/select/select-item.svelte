<script lang="ts">
  import Check from "lucide-svelte/icons/check";
  import { Select as SelectPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

  type Props = SelectPrimitive.ItemProps;

  let {
    class: className,
    children,
    value,
    label,
    disabled,
    ...rest
  }: Props = $props();
</script>

<SelectPrimitive.Item
  {value}
  {disabled}
  {label}
  class={cn(
    "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    className
  )}
  {...rest}
>
  <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
    <SelectPrimitive.ItemIndicator>
      <Check class="h-4 w-4" />
    </SelectPrimitive.ItemIndicator>
  </span>
  <!-- <slot>
    {label || value}
  </slot> -->
  {#if children}
    {@render children?.()}
  {:else if label}
    {label}
  {:else if value}
    {value}
  {/if}
  
</SelectPrimitive.Item>
