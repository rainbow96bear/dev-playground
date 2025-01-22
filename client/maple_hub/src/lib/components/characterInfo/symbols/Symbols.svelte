<script>
   import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import "./EquippedItems.css"
    let symbols: any;

    onMount(async () => {
      const characterName = $page.url.searchParams.get('name');
      if (characterName == undefined){
        return
      }
      
        const res = await fetch(`/api/data/equipped_symbols?name=${characterName}`);
        if (res.ok) {
          symbols = await res.json();
        } else {
          console.error('Failed to load equipped items');
        }
      
    });
</script>

<div>
	{#each symbols.symbol as symbol}
		
	{/each}
</div>