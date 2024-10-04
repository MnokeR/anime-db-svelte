<script lang="ts">
  import type { LayoutData } from "../../$types";

  let { data }: { data: LayoutData } = $props();
</script>

<img src={data.details?.Media.bannerImage} alt="Banner" />
{data.details?.Media.title.userPreferred}
