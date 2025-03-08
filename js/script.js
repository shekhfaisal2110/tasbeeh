document.addEventListener("DOMContentLoaded", function () {
    let tasbeehData = JSON.parse(localStorage.getItem("selectedTasbeeh"));
    if (!tasbeehData) {
        // Set a default Tasbeeh if none is found
        tasbeehData = {
            name: "SubhanAllah",
            transliteration: "سُبْحَانَ ٱللَّٰهِ",
            count: 0,
            limit: 100
        };
        localStorage.setItem("selectedTasbeeh", JSON.stringify(tasbeehData));
    }
    document.getElementById("tasbeeh-name").textContent = tasbeehData.name;
    document.getElementById("tasbeeh-transliteration").textContent = tasbeehData.transliteration;
    let count = tasbeehData.count;
    const maxCount = tasbeehData.limit;
    const countDisplay = document.getElementById("count");
    const incrementBtn = document.getElementById("increment");
    const decrementBtn = document.getElementById("decrement");
    const resetBtn = document.getElementById("reset");
    const congratsMessage = document.getElementById("congrats");
    function updateDisplay() {
        countDisplay.textContent = `${count}/${maxCount}`;
        tasbeehData.count = count;
        localStorage.setItem("selectedTasbeeh", JSON.stringify(tasbeehData)); 
        // Update in tasbeehItems array as well
        let tasbeehItems = JSON.parse(localStorage.getItem("tasbeehItems")) || [];
        let index = tasbeehItems.findIndex(t => t.name === tasbeehData.name);
        if (index !== -1) {
            tasbeehItems[index].count = count;
            localStorage.setItem("tasbeehItems", JSON.stringify(tasbeehItems));
        }
    }
    incrementBtn.addEventListener("click", () => {
        if (count < maxCount) {
            count++;
            updateDisplay();
            if (count === maxCount) {
                congratsMessage.style.display = "block";
                showFireworks(); 
            }
        }
    });
    decrementBtn.addEventListener("click", () => {
        if (count > 0) {
            count--;
            updateDisplay();
            congratsMessage.style.display = "none";
        }
    });
    resetBtn.addEventListener("click", () => {
        count = 0;
        updateDisplay();
        congratsMessage.style.display = "none";
    });
    updateDisplay();
});

const emojis = ["🎆", "🎉", "✨", "💥", "🎊"];
// Function to create emoji fireworks
function showFireworks() {
    for (let i = 0; i < 15; i++) {
        let firework = document.createElement("div");
        firework.classList.add("firework");
        firework.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        document.body.appendChild(firework);
        // Random positions
        let randomX = Math.random() * window.innerWidth;
        let randomY = Math.random() * window.innerHeight;
        firework.style.left = `${randomX}px`;
        firework.style.top = `${randomY}px`;
        // Remove firework after animation
        setTimeout(() => {
            firework.remove();
        }, 1000);
    }
    // Create particle effects
    for (let i = 0; i < 30; i++) {
        let particle = document.createElement("div");
        particle.classList.add("particle");
        document.body.appendChild(particle);
        let randomX = Math.random() * window.innerWidth;
        let randomY = Math.random() * window.innerHeight;
        let moveX = (Math.random() - 0.5) * 300 + "px";
        let moveY = (Math.random() - 0.5) * 300 + "px";
        particle.style.left = `${randomX}px`;
        particle.style.top = `${randomY}px`;
        particle.style.setProperty("--x", moveX);
        particle.style.setProperty("--y", moveY);
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 2500);
    }
}