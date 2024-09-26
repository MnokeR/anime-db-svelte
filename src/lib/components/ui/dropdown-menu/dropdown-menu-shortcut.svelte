<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	type Props = HTMLAttributes<HTMLSpanElement>;

	let {class: className, children, ...rest}: Props = $props()
</script>

<span class={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...rest}>
	{@render children?.()}
</span>
