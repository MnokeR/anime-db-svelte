<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { cn, flyAndScale } from "$lib/utils.js";

	type Props = DropdownMenuPrimitive.SubContentProps;

	let {class: className, children, transition = flyAndScale, transitionConfig = {x: -10, y: 0}, ...rest}: Props = $props()
</script>

<DropdownMenuPrimitive.SubContent
	{transition}
	{transitionConfig}
	class={cn(
		"bg-popover text-popover-foreground z-50 min-w-[8rem] rounded-md border p-1 shadow-lg focus:outline-none",
		className
	)}
	{...rest}
>
	{@render children?.()}
</DropdownMenuPrimitive.SubContent>
