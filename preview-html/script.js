const originalBorders = new Map();

function iframeClickListener(event) {
  const mouseEvent = event;
  event.stopPropagation(); // prevent js
  event.preventDefault(); // prevent a link

  const target = mouseEvent.target;
  iframeMouseOutTracker(event)
  
  window.parent.postMessage(
    {
      type: "select-element-end",
      outerHTML: target ? target.outerHTML : "",
    },
    "*"
  );
}

function iframeMouseOverTracker(e) {
  if (e.target && e.target.tagName !== "HTML" && e.target.tagName !== "BODY") {
    // Store the original border style if not already stored
    if (!originalBorders.has(e.target)) {
      originalBorders.set(e.target, e.target.style.border);
    }
    e.target.style.border = "2px solid red";
    e.target.classList.add("breathing-border");
  }
}

function iframeMouseOutTracker(e) {
  if (e.target && e.target.tagName !== "HTML" && e.target.tagName !== "BODY") {
    // Restore the original border style
    e.target.style.border = originalBorders.get(e.target) || "";
    e.target.classList.remove("breathing-border");
  }
}

window.addEventListener("message", (event) => {
  const bodyEl = window.document.body;

  if (event.data.type === "select-element-start") {
    bodyEl.addEventListener("click", iframeClickListener, true);
    bodyEl.addEventListener("mouseover", iframeMouseOverTracker);
    bodyEl.addEventListener("mouseout", iframeMouseOutTracker);
  }

  if (event.data.type === "select-element-finish") {
    bodyEl.removeEventListener("click", iframeClickListener, true);
    bodyEl.removeEventListener("mouseout", iframeMouseOutTracker);
    bodyEl.removeEventListener("mouseover", iframeMouseOverTracker);
  }
});
