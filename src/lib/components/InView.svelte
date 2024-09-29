<script lang="ts">
  let { loadMore }: { loadMore: () => Promise<void> } = $props();
  let observer: IntersectionObserver;
  let sentinal: HTMLDivElement;

  const onIntersect = async (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      await loadMore();
    }
  };

  $effect(() => {
    observer = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    });
    observer.observe(sentinal);
  });
</script>

<div bind:this={sentinal}></div>
