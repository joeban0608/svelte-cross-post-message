
<script lang="ts">
  let isFullScreen = $state(false);
  function toggleFullscreen(bool:boolean) {
    isFullScreen = bool
  }
</script>
<h1>Welcome to Main page</h1>
<p>Here is try to open in iframe</p>
<div class="flex space-x-4">
	<div class="mockup-browser border bg-base-300 {isFullScreen?'fullscreen':''}">
		<div class="mockup-browser-toolbar bg-base-300 py-4" style="margin-top: 0; margin-bottom: 0;">
			<div class="input">https://daisyui.com</div>
      <div class="flex gap-2">
        {#if isFullScreen}
          <button class="btn btn-xs btn-info" onclick={()=>toggleFullscreen(false)}>unfullscreen</button>
        {:else}
          <button class="btn btn-xs btn-info" onclick={()=>toggleFullscreen(true)}>fullscreen</button>
        {/if}
      </div>
		</div>
		<div class="w-full h-full border-t border-base-300"> 
			<iframe 
        src="http://localhost:5174" title="preview page" class="w-full h-full bg-[#fff] pb-12"
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