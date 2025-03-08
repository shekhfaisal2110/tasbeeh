document.addEventListener("DOMContentLoaded", function () {
    const tasbeehList = document.getElementById("tasbeeh-list");
    const modal = document.getElementById("modal");
    const openModalBtn = document.getElementById("addTasbeeh");
    const closeModalBtn = document.getElementById("closeModal");
    const saveTasbeehBtn = document.getElementById("saveTasbeeh");
    const tasbeehNameInput = document.getElementById("tasbeehName");
    const tasbeehCountInput = document.getElementById("tasbeehCount");
    const messageBox = document.getElementById("message-box");

    if (!tasbeehList) {
        console.error("Error: 'tasbeeh-list' element not found in the DOM.");
        return;
    }

    // Function to translate Tasbeeh name to Urdu
    async function translateToUrdu(text) {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ur`;
        try {
            let response = await fetch(url);
            let result = await response.json();
            return result.responseData.translatedText || "Custom Tasbeeh";
        } catch (error) {
            console.error("Translation Error:", error);
            return "Custom Tasbeeh";
        }
    }

     // Function to show messages
     function showMessage(message, type = "error") {
        messageBox.textContent = message;
        messageBox.style.display = "block";
        messageBox.style.backgroundColor =
            type === "success" ? "#4CAF50" : type === "warning" ? "#ff9800" : "#f44336";
        messageBox.style.color = "#fff";
        setTimeout(() => {
            messageBox.style.opacity = "1";
            setTimeout(() => {
                messageBox.style.opacity = "0";
                setTimeout(() => {
                    messageBox.style.display = "none";
                }, 300);
            }, 2500);
        }, 100);
    }

    // Load Tasbeeh Data
    function loadTasbeehData() {
        let tasbeehItems = JSON.parse(localStorage.getItem("tasbeehItems")) || [];
        tasbeehList.innerHTML = "";

        tasbeehItems.forEach((tasbeeh, index) => {
            addTasbeehItem(tasbeeh, index);
        });
    }

    // Add Tasbeeh Item to UI
    function addTasbeehItem(tasbeeh, index) {
        const tasbeehItem = document.createElement("div");
        tasbeehItem.classList.add("tasbeeh-item");
        tasbeehItem.dataset.index = index;

        tasbeehItem.innerHTML = `
            <h3 class="tasbeeh-name">${tasbeeh.name} ${tasbeeh.completed ? "✅" : ""}</h3>
            <p class="transliteration">${tasbeeh.transliteration}</p>
            <p class="count-display"><span class="count">${tasbeeh.count}</span> / <span class="goal">${tasbeeh.limit}</span></p>
            
            <div class="buttons">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>

            <div class="edit-form hidden">
                <input type="number" class="edit-goal" value="${tasbeeh.limit}" min="1">
                <button class="save-btn">Save</button>
            </div>
        `;

        // Edit Button Click Event
        tasbeehItem.querySelector(".edit-btn").addEventListener("click", function () {
            tasbeehItem.querySelector(".edit-form").classList.toggle("hidden");
        });

        // Save Edited Goal
        tasbeehItem.querySelector(".save-btn").addEventListener("click", function () {
            let newGoal = parseInt(tasbeehItem.querySelector(".edit-goal").value.trim());

            if (isNaN(newGoal) || newGoal <= 0) {
                alert("Please enter a valid goal count!");
                return;
            }

            // Update Tasbeeh data
            let tasbeehItems = JSON.parse(localStorage.getItem("tasbeehItems")) || [];
            tasbeehItems[index].limit = newGoal;
            localStorage.setItem("tasbeehItems", JSON.stringify(tasbeehItems));

            // Update UI
            tasbeehItem.querySelector(".goal").textContent = newGoal;
            tasbeehItem.querySelector(".edit-form").classList.add("hidden");

            alert("Tasbeeh goal updated successfully!");
        });


        tasbeehItem.addEventListener("click", function () {
            localStorage.setItem("selectedTasbeeh", JSON.stringify({ name, transliteration, count, limit }));
            window.location.href = "index.html";
        });

        // Delete Button Click Event
        tasbeehItem.querySelector(".delete-btn").addEventListener("click", function () {
            if (confirm("Are you sure you want to delete this Tasbeeh?")) {
                let tasbeehItems = JSON.parse(localStorage.getItem("tasbeehItems")) || [];
                tasbeehItems.splice(index, 1);
                localStorage.setItem("tasbeehItems", JSON.stringify(tasbeehItems));
                loadTasbeehData(); // Reload list
            }
        });

        tasbeehList.appendChild(tasbeehItem);
    }

    // Open modal to add new Tasbeeh
    openModalBtn.addEventListener("click", () => modal.classList.add("show"));
    closeModalBtn.addEventListener("click", () => modal.classList.remove("show"));

    window.addEventListener("click", (event) => {
        if (event.target === modal) modal.classList.remove("show");
    });

    // Save Tasbeeh
    saveTasbeehBtn.addEventListener("click", function () {
        const name = tasbeehNameInput.value.trim();
        const limit = parseInt(tasbeehCountInput.value.trim());

        let tasbeehItems = JSON.parse(localStorage.getItem("tasbeehItems")) || [];
        let existingIndex = tasbeehItems.findIndex(tasbeeh => tasbeeh.name.toLowerCase() === name.toLowerCase());

        if (existingIndex !== -1) {
            // If it already exists, update the count limit
            tasbeehItems[existingIndex].limit = limit;
            alert("Tasbeeh updated successfully!");
        } else {
            // Add new Tasbeeh item
            let newTasbeeh = { name, transliteration: name, count: 0, limit, completed: false };
            tasbeehItems.push(newTasbeeh);
            alert("Tasbeeh added successfully!");
        }

        localStorage.setItem("tasbeehItems", JSON.stringify(tasbeehItems));
        loadTasbeehData();

        // Clear input fields and close modal
        tasbeehNameInput.value = "";
        tasbeehCountInput.value = "";
        modal.classList.remove("show");
    });

    // Initial data load
    loadTasbeehData();
});


document.addEventListener("DOMContentLoaded", function () {
    const refreshMessageBox = document.getElementById("refresh-message-box");
    function showRefreshMessage(message) {
        refreshMessageBox.textContent = message;
        refreshMessageBox.style.display = "block";
        setTimeout(() => {
            refreshMessageBox.style.opacity = "1";
            setTimeout(() => {
                refreshMessageBox.style.opacity = "0";
                setTimeout(() => {
                    refreshMessageBox.style.display = "none";
                }, 500);
            }, 3000);
        }, 100);
    }
    function checkTasbeehData() {
        let tasbeehItems = JSON.parse(localStorage.getItem("tasbeehItems")) || [];
        // Show message only if Tasbeeh data is missing and it hasn't been shown before
        if (tasbeehItems.length === 0 && !sessionStorage.getItem("refreshMessageShown")) {
            showRefreshMessage("Tasbeeh data is missing. Please refresh the page.");
            sessionStorage.setItem("refreshMessageShown", "true");
            // Auto-refresh the page after 2 seconds (optional)
            setTimeout(() => {
                location.reload();
            }, 5000);
        }
    }
    checkTasbeehData();
});