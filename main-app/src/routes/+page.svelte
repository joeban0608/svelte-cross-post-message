<script lang="ts">
	import { onMount } from 'svelte';

	let isFullScreen = $state(false);
	let message = $state('');
	let iframeDom: HTMLIFrameElement | null = $state(null);
	let isStartSelect = $state(false);
	function toggleFullscreen(bool: boolean) {
		isFullScreen = bool;
	}
	function setSelect(bool: boolean) {
		isStartSelect = bool;
	}

	// onMount(() => {
	// 	window.addEventListener('message', (event) => {
	// 		if (event.data.type === 'select-element-end') {
	// 			const data = JSON.stringify({
	// 				tagName: event.data.tagName,
	// 				classList: event.data.classList,
	// 				outerHTML: event.data.outerHTML,
	// 				id: event.data.id
	// 			});
	// 			message = data;
	// 		}
	// 	});
	// });

	$effect(() => {
		console.log('message', message);
	});

	onMount(() => {
		if (window) {
			window.addEventListener('message', (event) => {
				console.log('event', event);
				// type: 'select-element-end'
				if (event.data.type === 'select-element-end') {
					toggleFullscreen(false);
					alert('end select');
					const data = JSON.stringify({
						tagName: event.data.tagName,
						classList: event.data.classList,
						outerHTML: event.data.outerHTML,
						id: event.data.id
					});
					message = data;
				}
			});
		}
	});
</script>

<h1>Welcome to Main page</h1>
<p>Here is try to open in iframe</p>
<button
	class="btn btn-info"
	onclick={() => {
		setSelect(true);
		toggleFullscreen(true);
		if (iframeDom && iframeDom?.contentWindow) {
			console.log('start post message in main-app');
			iframeDom?.contentWindow.postMessage(
				{ type: 'select-element-start', message: 'hi start to select' },
				'*'
			);
		}
	}}
>
	start select
</button>
<div class="flex space-x-4">
	<div class="mockup-browser border bg-base-300 {isFullScreen ? 'fullscreen' : ''}">
		<div class="mockup-browser-toolbar bg-base-300 py-4" style="margin-top: 0; margin-bottom: 0;">
			<div class="input">https://daisyui.com</div>
			<div class="flex gap-2">
				{#if isFullScreen}
					<button class="btn btn-info btn-xs" onclick={() => toggleFullscreen(false)}>
						unfullscreen
					</button>
				{:else}
					<button class="btn btn-info btn-xs" onclick={() => toggleFullscreen(true)}>
						fullscreen
					</button>
				{/if}
			</div>
		</div>
		<div class="h-full w-full border-t border-base-300">
			<iframe
				bind:this={iframeDom}
				src="http://localhost:5174"
				title="preview page"
				class="h-full w-full bg-[#fff] pb-12"
			>
			</iframe>
		</div>
	</div>
</div>

<style>
	.fullscreen {
		background: inherit;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
	}
</style>
