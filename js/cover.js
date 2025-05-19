document.addEventListener("DOMContentLoaded", () => {
    const pendulum = document.querySelector(".pendulum")
    const magnet = document.getElementById("magnet");
    const collectables = Array.from(document.querySelectorAll(".collectable"));
    const collected = [];

    magnet.addEventListener("mousedown", startDrag);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("mousemove", doDrag);

    let angle = 0;
    let vel = 0;
    const length = 200;
    const damping = 0.995;
    const gravity = 0.0005;

    let dragging = false;
    let lastX, lastTime;

    function animate() {
        if (!dragging) {
            const accel = -gravity * Math.sin(angle)
            vel += accel;
            vel *= damping;
            angle += vel;
            pendulum.style.transform = `rotate(${angle}rad)`;
        }
        
        const magRect = magnet.getBoundingClientRect();
        const head = {
            x: magRect.left + magRect.width / 2,
            y: magRect.top + magRect.height
        };

        collectables.forEach(item => {
            if (item.dataset.collected === "false") {
                const itemRect = item.getBoundingClientRect();
                const centX = itemRect.left + itemRect.width / 2;
                const centY = itemRect.top + itemRect.height / 2;

                const diffX = centX - head.x;
                const diffY = centY - head.y;
                const dist = Math.hypot(diffX, diffY);

                if (dist < 100) {
                    item.dataset.collected = "true";
                    collected.push({
                        element: item,
                        offsetX: diffX,
                        offsetY: diffY
                    });
                }

            }
        });

        collected.forEach(({element, offsetX, offsetY}) => {
            element.style.position = "fixed";
            element.style.left = `${head.x + offsetX}px`;
            element.style.top = `${head.y + offsetY}px`;
            element.style.transition = "none";
        });

        requestAnimationFrame(animate);
    }


    function startDrag(event) {
        dragging = true;
        lastX = event.clientX;
        lastTime = performance.now();
        vel = 0;
    }

    function endDrag() {
        dragging = false;
    }

    function doDrag(event) {
        if (!dragging) return;

        const diffX = event.clientX - lastX;
        angle += -diffX / length;
        pendulum.style.transform = `rotate(${angle}rad)`;

        const now = performance.now();
        vel = (event.clientX - lastX) / (now - lastTime);
        vel *= -4 / length;
        lastX = event.clientX;
        lastTime = now;
    }

    requestAnimationFrame(animate);
});