document.addEventListener('DOMContentLoaded', () => {
    const magnet = document.getElementById("magnet");
    const scene = document.querySelector(".magnet-scene");
    const tabs = document.querySelectorAll(".tab")

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

        checkTabs()
    }
    

    function checkTabs() {
        const magentRect = magnet.getBoundingClientRect();
        const x = magentRect.left + magentRect.width / 2;
        const y = magentRect.top + magentRect.height / 2;

        tabs.forEach(tab => {
            const tabRect = tab.getBoundingClientRect();

            let tabEdgeX;
            const tabEdgeY = tabRect.top + tabRect.height / 2;

            if (tab.classList.contains("tab-about") || tab.classList.contains("tab-projects")) {
                tabEdgeX = tabRect.left + tabRect.width;
            } else {
                tabEdgeX = tabRect.left;
            }

            const diffX = x - tabEdgeX;
            const diffY = y - tabEdgeY;
            const dist = Math.hypot(diffX, diffY);

            if (dist < 120) {
                tab.classList.add("pulled");
            } else {
                tab.classList.remove("pulled");
            }
        })
    }

    checkTabs();
});