// routes/+page.svelte
<script lang="ts">
import Counter from './Counter.svelte'
import { page } from '$app/stores'
import { trpc } from '$lib/trpc/client'

let greeting = 'press the button to load data'
let loading = false

const loadData = async () => {
  loading = true
  greeting = await trpc($page).greeting.query()
  loading = false
}
</script>

<svelte:head>
  <title>Where Dough</title>
  <meta name="description" content="Where Dough Finance App" />
</svelte:head>

<section class="flex items-center justify-center flex-col flex-[.6]">
  <h1 class="text-3xl font-bold underline">
    Where Dough
  </h1>

  <Counter />
</section>

<h6>Loading data in<br /><code>+page.svelte</code></h6>

<button
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex w-max"
  aria-busy={loading}
  on:click|preventDefault={loadData}>Load</button
>
<p>{greeting}</p>

<style>
h1 {
  width: 100%;
}
</style>
