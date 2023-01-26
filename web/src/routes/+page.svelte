<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
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

<style>


	h1 {
		width: 100%;
	}
</style>
