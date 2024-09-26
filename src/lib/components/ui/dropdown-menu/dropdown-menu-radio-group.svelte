<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	type Props = DropdownMenuPrimitive.RadioGroupProps;

	let {children, value, ...rest}: Props = $props()
</script>

<DropdownMenuPrimitive.RadioGroup {...rest} bind:value>
	{@render children?.()}
</DropdownMenuPrimitive.RadioGroup>
