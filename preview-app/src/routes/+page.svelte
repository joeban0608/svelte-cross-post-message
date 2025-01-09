<script lang="ts">
	import { onMount } from 'svelte';

	function iframeClickListener(event: MouseEvent) {
		const mouseEvent = event;
		event.stopPropagation(); // prevent js
		event.preventDefault(); // prevent a link
		const target = mouseEvent.target;
		console.log('target', target);
		alert('element selected');

		window.parent.postMessage(
			{
				type: 'select-element-end',
				outerHTML: target instanceof HTMLElement ? target.outerHTML : ''
			},
			'*'
		);
	}

	onMount(() => {
		if (window) {
			window.addEventListener('message', (event) => {
				console.log('event', event);

				if (event.data.type === 'select-element-start') {
					window.document.body.addEventListener('click', iframeClickListener, true);
				}
				if (event.data.type === 'select-element-finish') {
					alert('finish select');
					window.document.body.removeEventListener('click', iframeClickListener, true);
				}
			});
		}
	});
</script>

<main class="flex flex-col gap-4">
	<h1 class="text-4xl font-bold">Welcome to preview page!</h1>
	<p>Here is try to open in iframe</p>
	<a href="http://localhost:5173" class="btn btn-link">click me to redirect main-app</a>
	<button class="btn btn-primary" onclick={() => alert('here is preview page')}>
		Click to alert
	</button>
</main>
