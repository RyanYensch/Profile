document.querySelectorAll(".toggle-group").forEach(group => {
    group.addEventListener("click", () => {
        const target = group.dataset.target;
        const dir = group.dataset.dir;
        const panel = document.getElementById(target);
        const panelHeight = panel.getBoundingClientRect().height;
        const offset = (dir == "up") ? -panelHeight : panelHeight;

        panel.classList.toggle("open")
        if (panel.classList.contains("open")) {
            group.style.setProperty("--offset", `${offset}px`);
        } else {
            group.style.setProperty("--offset", "0px");
        }
        
    });
});