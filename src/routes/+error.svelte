<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				message: error.message,
				status
			}
		};
	}
</script>

<script>
	import ErrorPage from '$lib/components/ErrorPage.svelte'; // your own Error screen component
	import NotFoundPage from '$lib/components/NotFoundPage.svelte'; // your own 404 screen component

	export let message;
	export let status;
</script>

{#if parseInt(status) === 405}
	<NotFoundPage {message} />
{:else}
	<ErrorPage {message} {status} />
{/if}
