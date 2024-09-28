<script lang="ts">
  import * as Select from "$lib/components/ui/select";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

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
  let title = $state(selectOptions[0].label);
  const searchParams = $page.url.searchParams;

  const findSelectedOptions = () => {
    const paramValue = searchParams.get(title.toLowerCase());
    if (paramValue) {
      const foundItem = selectOptions[0].items.find(
        (item) => String(item.value) === paramValue
      );
      return foundItem
        ? { label: foundItem.label, value: foundItem.value }
        : { label: "", value: "" };
    }
    return { label: undefined, value: undefined };
  };

  let selectedOption = $state(findSelectedOptions());
  const updateSearchParams = () => {
    goto(`?${searchParams.toString()}`, { replaceState: true });
  };

  const handleChange = (value: string | number) => {
    const param = title.toLowerCase();
    if (value === "") {
      searchParams.delete(param);
    }
    if (value) {
      searchParams.set(param, value.toString());
    }
    updateSearchParams();
  };
</script>

<Select.Root
  selected={selectedOption}
  onSelectedChange={(s) => {
    if (typeof s?.value === "string" || typeof s?.value === "number") {
      handleChange(s?.value);
    }
  }}
>
  <Select.Trigger class="w-24">
    <Select.Value placeholder={title} />
  </Select.Trigger>
  <Select.Content class="max-h-[420px]">
    <Select.Input value={title} />
    <ScrollArea orientation="vertical">
      <Select.Item value="" label="">Clear</Select.Item>
      <Select.Separator />
      <div class="max-h-[370px]">
        {#each selectOptions[0].items as item}
          <Select.Item value={item.value} label={item.label} />
        {/each}
      </div>
    </ScrollArea>
  </Select.Content>
</Select.Root>
