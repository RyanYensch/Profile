document.addEventListener('DOMContentLoaded', () => {
    const magnet = document.getElementById("magnet");
    const scene = document.querySelector(".magnet-scene");
    let offsetX, offsetY;
    let dragging =  false;

    magnet.addEventListener("mousedown", startDrag);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("mousemove", doDrag);

    function startDrag(event) {
        dragging = true;
        const rect = magnet.getBoundingClientRect();

        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
    }

    function endDrag() {
        dragging = false;
    }

    function doDrag(event) {
        if (!dragging) return;

        const rect = scene.getBoundingClientRect();
        let x = event.clientX - rect.left - offsetX;
        let y = event.clientY - rect.top - offsetY;
        
        x = Math.max(0, Math.min(x, rect.width - magnet.offsetWidth));
        y = Math.max(0, Math.min(y, rect.height - magnet.offsetHeight));

        magnet.style.left = `${x}px`;
        magnet.style.top = `${y}px`;
        magnet.style.transform = `none`;
    }
});