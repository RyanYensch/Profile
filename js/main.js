document.addEventListener("DOMContentLoaded", () => {
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

        checkTabs();
        magnetOrientation();
    }
    

    function checkTabs() {
        const sceneRect  = scene.getBoundingClientRect();
        const magnetRect = magnet.getBoundingClientRect();
        const x = magnetRect.left + magnetRect.width  / 2;
        const y = magnetRect.top  + magnetRect.height / 2;

        let closest = { tab: null, dist: Infinity, isLeft: false };

        tabs.forEach(tab => {
            const labelRect = tab.querySelector(".tab-label").getBoundingClientRect();
            const isLeft    = tab.classList.contains("tab-about") || tab.classList.contains("tab-projects");

            let diffX;
            if (isLeft) {
                diffX = x - labelRect.right;
            } else {
                diffX = labelRect.left - x;
            }
            if (diffX <= 0) return;

            const diffY = y - (labelRect.top + labelRect.height / 2);
            const dist  = Math.hypot(diffX, diffY);

            if (dist < closest.dist) {
                closest = {tab, dist, isLeft};
            }
        });

        const GAP = -1000;
        const ACTIVATE_DIST = 500;

        tabs.forEach(tab => {
            const content   = tab.querySelector('.tab-content');
            if (tab === closest.tab && closest.dist <= ACTIVATE_DIST) {
                const labelRect = tab.querySelector('.tab-label').getBoundingClientRect();

                let available;
                if (closest.isLeft) {
                    available = magnetRect.left - (labelRect.right + GAP);
                } else {
                    available = (labelRect.left - GAP) - magnetRect.right;
                }
                content.style.maxWidth = `${Math.max(0, available)}px`;
            } else {
                content.style.maxWidth = '0';
            }
        });
    }


    function magnetOrientation() {
        const sceneRect = scene.getBoundingClientRect();
        const magnetRect = magnet.getBoundingClientRect();

        const magnetCenter = magnetRect.left + magnetRect.width / 2;
        const sceneCenter = sceneRect.left + sceneRect.width / 2;

        if (magnetCenter <= sceneCenter) {
            magnet.style.transform = "translate(-50%, -50%) rotate(0deg)";
        } else {
            magnet.style.transform = "translate(-50%, -50%) rotate(180deg)";
        }
    }

    checkTabs();
});