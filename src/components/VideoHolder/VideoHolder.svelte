<script>
	import VideoMeta from './VideoMeta.svelte';

	export let modalProps;
</script>

<div class="container">
	<VideoMeta {modalProps} />
	<div class="video-wrapper">
		<iframe
			src={`https://www.nhl.com/video/embed/c-${modalProps.id}?autostart=true`}
			frameborder="0"
			scrolling="no"
			allowfullscreen="allowfullscreen"
			title={modalProps.title}
		/>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.video-wrapper {
		width: 100%;
		height: 100%;
	}

	iframe {
		width: 100%;
		height: 100%;
	}
</style>
