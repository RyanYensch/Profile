document.querySelectorAll(".magnet-icon").forEach(mag => {
    mag.addEventListener("click", () => {
        const target = mag.dataset.target;
        const dir = mag.dataset.dir;
        const panel = document.getElementById(target);
        const label = document.querySelector(`.label[data-target="${target}"]`);
        const panelHeight = panel.getBoundingClientRect().panelHeight;

        if (!panel.classList.contains("open")) {
            panel.classList.add("open");
            const shift = (dir == "up") ? -panelHeight : panelHeight;

            mag.style.transform = `translateY(${shift}px) ${(dir == "down") ? "rotate(180deg)" : ""}`;
            label.style.transform = `translateY(${shift}px)`;
        } else {
            panel.classList.remove("open");
            mag.style.transform ="";
            label.style.transform = "";
        }
        
    });
});