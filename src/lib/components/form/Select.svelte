<script lang="ts">
  import * as Select from "$lib/components/ui/select";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

  type SelectProps = {
    option: string;
    items: {
      label: string | number;
      value: string;
    }[];
  };
  let { option, items }: SelectProps = $props();
</script>

<Select.Root>
  <Select.Trigger class="w-[100px]">
    <Select.Value placeholder={option} />
  </Select.Trigger>
  <Select.Content>
    <ScrollArea class="h-[400px] w-auto">
      <Select.Item value="none">{option}</Select.Item>
      <Select.Separator />
      {#each items as item}
        <Select.Item value={item.value}>{item.label}</Select.Item>
      {/each}
    </ScrollArea>
  </Select.Content>
</Select.Root>
