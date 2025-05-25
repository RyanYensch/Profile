window.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll(".magnet").forEach(mag => {
        mag.classList.add("pulse");
        setTimeout(() => mag.classList.remove("pulse"), 6_000);
    });

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


    async function fetchStandings() {
        const res = await fetch("https://f1api.dev/api/current/drivers-championship")
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        const json = await res.json();
        return json.drivers_championship;
    }

    function updateDriverCard(driverData, prefix) {
        document.getElementById(`${prefix}-position`).textContent = driverData.position;
        document.getElementById(`${prefix}-points`).textContent = driverData.points;
        document.getElementById(`${prefix}-wins`).textContent = driverData.wins;
    }

    async function fetchLeetCodeStats() {
        const res = await fetch("https://leetcode-stats-api.herokuapp.com/RyanYensch")
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        const json = await res.json();
        return json;
    }

    function updateLeetcodeStats(data, prefix) {
       document.getElementById(`${prefix}-solved`).textContent = data.totalSolved;
       document.getElementById(`${prefix}-questions`).textContent = data.totalQuestions;
       document.getElementById(`${prefix}-easy-solved`).textContent = data.easySolved;
       document.getElementById(`${prefix}-easy-questions`).textContent = data.totalEasy;
       document.getElementById(`${prefix}-medium-solved`).textContent = data.mediumSolved;
       document.getElementById(`${prefix}-medium-questions`).textContent = data.totalMedium;
       document.getElementById(`${prefix}-hard-solved`).textContent = data.hardSolved;
       document.getElementById(`${prefix}-hard-questions`).textContent = data.totalHard;
       

    }

    async function refreshStats() {
        try {
            const standings = await fetchStandings();
            const verstappen = standings.find(d => d.driverId === "max_verstappen");
            if (verstappen) updateDriverCard(verstappen, "verstappen");
        } catch (error) {
            console.error("Failed to load F1 stats:", error);
        }

        try {
            const leetCodeStats = await fetchLeetCodeStats();
            updateLeetcodeStats(leetCodeStats, "leetcode");
        } catch (error) {
            console.error("Failed to load F1 stats:", error);
        }
    }

    refreshStats();
    setInterval(refreshStats, 60_000);


    const menuToggle = document.getElementById("menu-toggle");
    const sideMenu = document.getElementById("side-menu");

    menuToggle.addEventListener("click", () => {
        sideMenu.classList.toggle("open");
        menuToggle.classList.toggle("open");
    });
});