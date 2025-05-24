document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".magnet").forEach(mag => {
        mag.addEventListener("click", () => {
            const panel = document.getElementById(mag.dataset.target);
            mag.classList.toggle("open");
            panel.classList.toggle("open");
        })
    })
});