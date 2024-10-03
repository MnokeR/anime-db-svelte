<script lang="ts">
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import { tick } from "svelte";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";
  import { X } from "lucide-svelte";
  import type { SelectProps } from "$lib/search-select-options";
  import ScrollArea from "../ui/scroll-area/scroll-area.svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  let { options, paramName }: { options: SelectProps; paramName?: string } =
    $props();

  let open = $state(false);
  const searchParams = $page.url.searchParams;
  const param = paramName ? paramName : options.title.toLowerCase();
  let value = $state<string | string[]>(findInitialParams());

  function findInitialParams() {
    const values = searchParams.get(param);
    if (values) {
      return values;
    }
    return "";
  }

  let selectedValue = $derived(
    options.items.find((f) => f.value === value)?.label || options.title
  );

  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }

  function updateSearchParams() {
    goto(`?${searchParams.toString()}`, { invalidateAll: true });
  }
  function setParams() {
    if (!value) {
      searchParams.delete(param);
    }
    if (value) {
      searchParams.set(param, value.toString());
    }
    updateSearchParams();
  }

  function handleClear() {
    value = "";
    searchParams.delete(param);
    updateSearchParams();
  }
</script>

<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="outline"
      role="combobox"
      aria-expanded={open}
      class={`w-[180px] justify-between truncate overflow-hidden ${selectedValue === options.title && "text-muted-foreground"}`}
    >
      {selectedValue}
      {#if selectedValue === options.title}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      {:else}
        <X
          class="ml-2 h-4 w-4 shrink-0 opacity-50"
          onclick={(e) => {
            e.stopPropagation();
            handleClear();
          }}
        />
      {/if}
    </Button>
  </Popover.Trigger>
  <Popover.Content class={`w-[180px] p-0`}>
    <Command.Root>
      {#if options.search}
        <Command.Input placeholder={`Search`} />
        <Command.Empty>No {options.title} found.</Command.Empty>
      {/if}
      <Command.Group>
        <ScrollArea orientation="vertical">
          <div class="max-h-[400px]">
            {#each options.items as item}
              <Command.Item
                class="flex justify-between"
                value={item.value}
                onSelect={(currentValue) => {
                  if (currentValue === value) {
                    value = "";
                  } else {
                    value = currentValue;
                  }
                  setParams();
                  closeAndFocusTrigger(ids.trigger);
                }}
                >{item.label}
                <Check
                  class={cn(
                    "mr-2 h-4 w-4",
                    value !== item.value && "text-transparent"
                  )}
                />
              </Command.Item>
            {/each}
          </div>
        </ScrollArea>
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
