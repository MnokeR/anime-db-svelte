<script lang="ts">
  import Form from '$lib/components/form/Form.svelte';
import Header from '$lib/components/header/Header.svelte';
  import '../app.css'
  let {children} = $props()
</script>
  
<Header />
<Form />
<main>{@render children()}</main>