<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  type SkeletonProps = HTMLAttributes<HTMLDivElement>;
  let { class: className, ...props }: SkeletonProps = $props();
</script>

<div
  class={cn("bg-muted animate-pulse rounded-md", className)}
  {...props}
></div>
