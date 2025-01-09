function iframeClickListener(event) {
  const mouseEvent = event;
  event.stopPropagation(); // prevent js
  event.preventDefault(); // prevent a link
  const target = mouseEvent.target;
  window.parent.postMessage(
    {
      type: "select-element-end",
      outerHTML: target ? target.outerHTML : "",
    },
    "*"
  );
}
window.addEventListener("message", (event) => {
  if (event.data.type === "select-element-start") {
    window.document.body.addEventListener("click", iframeClickListener, true);
  }
  if (event.data.type === "select-element-finish") {
    window.document.body.removeEventListener(
      "click",
      iframeClickListener,
      true
    );
  }
});
