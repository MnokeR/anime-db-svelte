<script lang="ts">
  import Form from '$lib/components/form/Form.svelte';
import Header from '$lib/components/header/Header.svelte';
  import SelectType from '$lib/components/SelectType.svelte';
  import '../app.css'
  let {children} = $props()
</script>
  
<Header />
<SelectType />
<Form />

<main>{@render children()}</main>