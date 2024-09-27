<script lang="ts">
  import * as Select from "$lib/components/ui/select";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

  type SelectProps = {
    selectOptions: {
      label: string;
      items: {
        label: string;
        value: string | number;
      }[];
    }[];
  };

  let { selectOptions }: SelectProps = $props();

  let placeholder = $state(selectOptions[0].label);
</script>

<Select.Root>
  <Select.Trigger class="w-24">
    <Select.Value {placeholder} />
  </Select.Trigger>
  <Select.Content class="max-h-[420px]">
    <Select.Input placeholder="Search" />
    <ScrollArea orientation="vertical">
      <Select.Item value={undefined} label="">Clear</Select.Item>
      <Select.Separator />
      <div class="max-h-[370px]">
        {#each selectOptions[0].items as item}
          <Select.Item value={item.value} label={item.label} />
        {/each}
      </div>
    </ScrollArea>
  </Select.Content>
</Select.Root>
