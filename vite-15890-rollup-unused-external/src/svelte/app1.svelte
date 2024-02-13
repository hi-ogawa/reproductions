<script lang="ts">
  import { omit } from 'lodash-es';
</script>

<!-- svelte eliminate event handler as a dead code on ssr build? -->
<!-- so rollup doesn't have a chance to see the usage of "omit" -->
<button on:click={() => console.log(omit)}></button>
