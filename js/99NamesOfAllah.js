document.addEventListener("DOMContentLoaded", function () {
   // const tasbeehList = document.getElementById("tasbeeh-list");
    const modal = document.getElementById("modal");
    const openModalBtn = document.getElementById("addTasbeeh");
    const closeModalBtn = document.getElementById("closeModal");
    const saveTasbeehBtn = document.getElementById("saveTasbeeh");
    const tasbeehNameInput = document.getElementById("tasbeehName");
    const tasbeehCountInput = document.getElementById("tasbeehCount");

    const asmaUlHusnaButton = document.getElementById("asmaUlHusna");
    const asmaUlHusnaModal = document.getElementById("asmaUlHusnaModal");
    const closeAsmaUlHusnaModal = document.getElementById("closeAsmaUlHusnaModal");
    const asmaUlHusnaList = document.getElementById("asmaUlHusnaList");
    const asmaUlHusnaCountInput = document.getElementById("asmaUlHusnaCount");
    const saveAsmaUlHusna = document.getElementById("saveAsmaUlHusna");

    const tasbeehList = document.getElementById("tasbeeh-list");
        if (!tasbeehList) {
            console.error("Error: 'tasbeeh-list' element not found in the DOM.");
            return;
        }
    // Load saved Tasbeeh data from localStorage
    function loadTasbeehData() {
        let tasbeehItems = JSON.parse(localStorage.getItem("tasbeehItems")) || [];
        tasbeehList.innerHTML = ""; // Clear list before reloading
        tasbeehItems.forEach(tasbeeh => {
            addTasbeehItem(tasbeeh.name, tasbeeh.transliteration, tasbeeh.count, tasbeeh.limit, tasbeeh.completed);
        });
    }
    function addTasbeehItem(name, transliteration, count, limit, completed) {
        if (!tasbeehList) {
            console.error("Error: 'tasbeeh-list' element not found.");
            return;
        }
        const tasbeehItem = document.createElement("div");
        tasbeehItem.classList.add("tasbeeh-item");
        let completedIcon = completed ? " ✅" : "";
        tasbeehItem.innerHTML = `
            <h3>${name} ${completedIcon}</h3>
            <p class="transliteration">${transliteration}</p>
            <p class="count-display"><span class="count">${count}</span>/${limit}</p>
        `;
        tasbeehItem.addEventListener("click", function () {
            localStorage.setItem("selectedTasbeeh", JSON.stringify({ name, transliteration, count, limit }));
            window.location.href = "index.html";
        });
        tasbeehList.appendChild(tasbeehItem);
    }

    // Open and Close Modal
    openModalBtn.addEventListener("click", () => modal.classList.add("show"));
    closeModalBtn.addEventListener("click", () => modal.classList.remove("show"));
    window.addEventListener("click", (event) => { if (event.target === modal) modal.classList.remove("show"); });
    // Save New Tasbeeh
    saveTasbeehBtn.addEventListener("click", function () {
        const tasbeehName = tasbeehNameInput.value.trim();
        const tasbeehLimit = parseInt(tasbeehCountInput.value.trim());
        const newTasbeeh = { 
            name: tasbeehName, 
            transliteration: tasbeehName, 
            count: 0, 
            limit: tasbeehLimit,
            completed: false
        };

        let tasbeehItems = JSON.parse(localStorage.getItem("tasbeehItems")) || [];
        tasbeehItems.push(newTasbeeh);
        localStorage.setItem("tasbeehItems", JSON.stringify(tasbeehItems));
        // let existingTasbeeh = tasbeehItems.find(tasbeeh => tasbeeh.name.toLowerCase() === name.toLowerCase());
        let existingTasbeeh = tasbeehItems.find(tasbeeh => tasbeeh.name.toLowerCase() === name.toLowerCase());
        if (existingTasbeeh) {
            existingTasbeeh.limit = limit;  // ❌ 'limit' is not defined
            alert("Tasbeeh updated successfully!");
        } else {
            let newTasbeeh = { name, transliteration: name, count: 0, limit, completed: false };
            tasbeehItems.push(newTasbeeh);
            alert("Tasbeeh added successfully!");
        }
        addTasbeehItem(newTasbeeh.name, newTasbeeh.transliteration, 0, tasbeehLimit, false);
        tasbeehNameInput.value = "";
        tasbeehCountInput.value = "";
        modal.classList.remove("show");
    });
    // Load Tasbeehs on page load
    loadTasbeehData();

 // ---------------------- 99 Names of Allah (Asma Ul Husna) ----------------------
const asmaUlHusnaData = [
    { name: "Ya Allah", transliteration: "يَا اللَّهُ" },
    { name: "Ya Rahman", transliteration: "يَا رَحْمَٰنُ" },
    { name: "Ya Raheem", transliteration: "يَا رَحِيمُ" },
    { name: "Ya Malik", transliteration: "يَا مَالِكُ" },
    { name: "Ya Quddus", transliteration: "يَا قُدُّوسُ" },
    { name: "Ya Salam", transliteration: "يَا سَلَامُ" },
    { name: "Ya Mu’min", transliteration: "يَا مُؤْمِنُ" },
    { name: "Ya Muhaymin", transliteration: "يَا مُهَيْمِنُ" },
    { name: "Ya Aziz", transliteration: "يَا عَزِيزُ" },
    { name: "Ya Jabbar", transliteration: "يَا جَبَّارُ" },
    { name: "Ya Mutakabbir", transliteration: "يَا مُتَكَبِّرُ" },
    { name: "Ya Khaliq", transliteration: "يَا خَالِقُ" },
    { name: "Ya Bari", transliteration: "يَا بَارِئُ" },
    { name: "Ya Musawwir", transliteration: "يَا مُصَوِّرُ" },
    { name: "Ya Ghaffar", transliteration: "يَا غَفَّارُ" },
    { name: "Ya Qahhar", transliteration: "يَا قَهَّارُ" },
    { name: "Ya Wahhab", transliteration: "يَا وَهَّابُ" },
    { name: "Ya Razzaq", transliteration: "يَا رَزَّاقُ" },
    { name: "Ya Fattah", transliteration: "يَا فَتَّاحُ" },
    { name: "Ya Alim", transliteration: "يَا عَلِيمُ" },
    { name: "Ya Qabid", transliteration: "يَا قَابِضُ" },
    { name: "Ya Basit", transliteration: "يَا بَاسِطُ" },
    { name: "Ya Khafid", transliteration: "يَا خَافِضُ" },
    { name: "Ya Rafi", transliteration: "يَا رَافِعُ" },
    { name: "Ya Muizz", transliteration: "يَا مُعِزُّ" },
    { name: "Ya Mudhill", transliteration: "يَا مُذِلُّ" },
    { name: "Ya Sami", transliteration: "يَا سَمِيعُ" },
    { name: "Ya Basir", transliteration: "يَا بَصِيرُ" },
    { name: "Ya Hakam", transliteration: "يَا حَكَمُ" },
    { name: "Ya Adl", transliteration: "يَا عَدْلُ" },
    { name: "Ya Latif", transliteration: "يَا لَطِيفُ" },
    { name: "Ya Khabir", transliteration: "يَا خَبِيرُ" },
    { name: "Ya Halim", transliteration: "يَا حَلِيمُ" },
    { name: "Ya Azim", transliteration: "يَا عَظِيمُ" },
    { name: "Ya Ghafur", transliteration: "يَا غَفُورُ" },
    { name: "Ya Shakur", transliteration: "يَا شَكُورُ" },
    { name: "Ya Aliyy", transliteration: "يَا عَلِيُّ" },
    { name: "Ya Kabir", transliteration: "يَا كَبِيرُ" },
    { name: "Ya Hafiz", transliteration: "يَا حَفِيظُ" },
    { name: "Ya Muqit", transliteration: "يَا مُقِيتُ" },
    { name: "Ya Hasib", transliteration: "يَا حَسِيبُ" },
    { name: "Ya Jalil", transliteration: "يَا جَلِيلُ" },
    { name: "Ya Karim", transliteration: "يَا كَرِيمُ" },
    { name: "Ya Raqib", transliteration: "يَا رَقِيبُ" },
    { name: "Ya Mujib", transliteration: "يَا مُجِيبُ" },
    { name: "Ya Wasi", transliteration: "يَا وَاسِعُ" },
    { name: "Ya Hakim", transliteration: "يَا حَكِيمُ" },
    { name: "Ya Wadud", transliteration: "يَا وَدُودُ" },
    { name: "Ya Majid", transliteration: "يَا مَجِيدُ" },
    { name: "Ya Ba'ith", transliteration: "يَا بَاعِثُ" },
    { name: "Ya Shahid", transliteration: "يَا شَهِيدُ" },
    { name: "Ya Haqq", transliteration: "يَا حَقُّ" },
    { name: "Ya Wakil", transliteration: "يَا وَكِيلُ" },
    { name: "Ya Qawiyy", transliteration: "يَا قَوِيُّ" },
    { name: "Ya Matin", transliteration: "يَا مَتِينُ" },
    { name: "Ya Waliyy", transliteration: "يَا وَلِيُّ" },
    { name: "Ya Hamid", transliteration: "يَا حَمِيدُ" },
    { name: "Ya Muhsi", transliteration: "يَا مُحْصِيُ" },
    { name: "Ya Mubdi", transliteration: "يَا مُبْدِئُ" },
    { name: "Ya Mu'id", transliteration: "يَا مُعِيدُ" },
    { name: "Ya Muhyi", transliteration: "يَا مُحْيِي" },
    { name: "Ya Mumit", transliteration: "يَا مُمِيتُ" },
    { name: "Ya Hayy", transliteration: "يَا حَيُّ" },
    { name: "Ya Qayyum", transliteration: "يَا قَيُّومُ" },
    { name: "Ya Wajid", transliteration: "يَا وَاجِدُ" },
    { name: "Ya Majid", transliteration: "يَا مَاجِدُ" },
    { name: "Ya Ahad", transliteration: "يَا أَحَدُ" },
    { name: "Ya Samad", transliteration: "يَا صَمَدُ" },
    { name: "Ya Qadir", transliteration: "يَا قَادِرُ" },
    { name: "Ya Muqtadir", transliteration: "يَا مُقْتَدِرُ" },
    { name: "Ya Muqaddim", transliteration: "يَا مُقَدِّمُ" },
    { name: "Ya Muakhkhir", transliteration: "يَا مُؤَخِّرُ" },
    { name: "Ya Awwal", transliteration: "يَا أَوَّلُ" },
    { name: "Ya Akhir", transliteration: "يَا آخِرُ" },
    { name: "Ya Dhahir", transliteration: "يَا ظَاهِرُ" },
    { name: "Ya Batin", transliteration: "يَا بَاطِنُ" }
];
    // Open Modal for Asma Ul Husna
    asmaUlHusnaButton.addEventListener("click", function () {
        loadAsmaUlHusnaList();
        asmaUlHusnaModal.classList.add("show");
    });
    // Close Modal for Asma Ul Husna
    closeAsmaUlHusnaModal.addEventListener("click", function () {
        asmaUlHusnaModal.classList.remove("show");
    });
    function loadAsmaUlHusnaList() {
        asmaUlHusnaList.innerHTML = "";
        asmaUlHusnaData.forEach((tasbeeh, index) => {
            let li = document.createElement("li");
            li.textContent = `${tasbeeh.name} (${tasbeeh.transliteration})`;
            li.dataset.index = index;
            li.addEventListener("click", function () {
                document.querySelectorAll("#asmaUlHusnaList li").forEach(item => item.classList.remove("selected"));
                li.classList.add("selected");
            });
            asmaUlHusnaList.appendChild(li);
        });
    }
    // Save Selected Name of Allah
    saveAsmaUlHusna.addEventListener("click", function () {
        const selectedTasbeeh = document.querySelector("#asmaUlHusnaList li.selected");
        const tasbeehCount = parseInt(asmaUlHusnaCountInput.value.trim());
        if (!selectedTasbeeh || isNaN(tasbeehCount) || tasbeehCount <= 0) {
            alert("Please select a Name of Allah and enter a valid count.");
            return;
        }
        const tasbeehIndex = selectedTasbeeh.dataset.index;
        const selectedTasbeehData = asmaUlHusnaData[tasbeehIndex];
        const newTasbeeh = {
            name: selectedTasbeehData.name,
            transliteration: selectedTasbeehData.transliteration,
            count: 0,
            limit: tasbeehCount,
            completed: false
        };
        let tasbeehItems = JSON.parse(localStorage.getItem("tasbeehItems")) || [];
        tasbeehItems.push(newTasbeeh);
        localStorage.setItem("tasbeehItems", JSON.stringify(tasbeehItems));

        addTasbeehItem(newTasbeeh.name, newTasbeeh.transliteration, 0, tasbeehCount, false);
        asmaUlHusnaModal.classList.remove("show");
    });
    // Close Modal when clicking outside
    window.onclick = function (event) {
        if (event.target == asmaUlHusnaModal) {
            asmaUlHusnaModal.classList.remove("show");
        }
    };
});