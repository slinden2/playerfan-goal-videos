<script>
	export let teamLink;
	export let imgLink;
	export let teamName;
</script>

<a href={teamLink} target="_blank" rel="noopener noreferrer">
	<img class={$$props.class} src={imgLink} alt={teamName} title={teamName} />
</a>

<style>
	img {
		display: block;
	}
</style>
