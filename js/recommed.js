document.addEventListener("DOMContentLoaded", function () {
    const recommendedModal = document.getElementById("recommendedModal");
    const openRecommendedBtn = document.getElementById("recommendedTasbeeh");
    const closeRecommendedBtn = document.getElementById("closeRecommendedModal");
    const saveRecommendedBtn = document.getElementById("saveRecommendedTasbeeh");
    const recommendedTasbeehList = document.getElementById("recommendedTasbeehList");
    const recommendedTasbeehCount = document.getElementById("recommendedTasbeehCount");

    const recommendedTasbeehat = [
        { name: "SubhanAllah", transliteration: "سبحان الله" },
        { name: "Alhamdulillah", transliteration: "الحمد لله" },
        { name: "Allahu Akbar", transliteration: "الله أكبر" },
        { name: "Astaghfirullah", transliteration: "أستغفر الله" },
        { name: "La ilaha illallah", transliteration: "لا إله إلا الله" },
        { name: "SubhanAllahi wa bihamdihi", transliteration: "سبحان الله وبحمده" },
        { name: "SubhanAllahi wa bihamdihi, SubhanAllahil Azeem", transliteration: "سبحان الله وبحمده، سبحان الله العظيم" },
        { name: "La hawla wa la quwwata illa billah", transliteration: "لا حول ولاقوة إلا بالله" },
        { name: "Hasbunallahu wa ni’mal wakeel", transliteration: "حسبنا الله ونعم الوكيل" },
        { name: "Rabbi zidni ilma", transliteration: "ربي زدني علما" },
        { name: "Bismillah", transliteration: "بِسْمِ اللَّهِ" },
        { name: "La ilaha illa Anta, Subhanaka inni kuntu minaz-zalimeen", transliteration: "لَا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ" },
        { name: "Rabbighfir li wa liwalidayya", transliteration: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ" },
        { name: "Rabbi inni lima anzalta ilayya min khairin faqir", transliteration: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ" },
        { name: "Allahumma inni as'aluka al-afiyah", transliteration: "اللهم إني أسألك العافية" },
        { name: "Rabbi yassir wa la tu’assir", transliteration: "رَبِّ يَسِّرْ وَلاَ تُعَسِّرْ" },
        { name: "Allahumma inni as'aluka ilman nafi'an", transliteration: "اللهم إني أسألك علماً نافعاً" },
        { name: "Allahumma ajirni min an-naar", transliteration: "اللهم أجرني من النار" },
        { name: "Rabbi habli min ladunka rahmatan", transliteration: "رَبِّ هَبْ لِي مِن لَّدُنكَ رَحْمَةً" },
        { name: "Allahumma laka alhamdu kama yanbaghi", transliteration: "اللهم لك الحمد كما ينبغي" },
        { name: "Hasbunallahu wa ni’mal wakeel", transliteration: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ" },
        { name: "La hawla wa la quwwata illa billah", transliteration: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ" },
        { name: "Rabbi zidni ilma", transliteration: "رَبِّ زِدْنِي عِلْمًا" },
        { name: "Inna lillahi wa inna ilayhi raji’un", transliteration: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ" },
        { name: "Allahumma inni as’aluka min fadlik", transliteration: "اللهم إني أسألك من فضلك" },
        { name: "Rabbi shrah li sadri", transliteration: "رَبِّ اشْرَحْ لِي صَدْرِي" },
        { name: "Ya Hayyu Ya Qayyum, birahmatika astagheeth", transliteration: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ" },
        { name: "SubhanAllahi wa bihamdihi, SubhanAllahil Azeem", transliteration: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ" },
        { name: "Astaghfirullah wa atubu ilayh", transliteration: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ" },
        { name: "Rabbi inni limaa anzalta ilayya min khayrin faqir", transliteration: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ" }
    ];

    openRecommendedBtn?.addEventListener("click", () => {
        recommendedModal?.classList.add("show");
        loadRecommendedTasbeeh();
    });
    closeRecommendedBtn?.addEventListener("click", () => recommendedModal?.classList.remove("show"));
    function loadRecommendedTasbeeh() {
        if (!recommendedTasbeehList) return;
        recommendedTasbeehList.innerHTML = "";
        recommendedTasbeehat.forEach((tasbeeh, index) => {
            let li = document.createElement("li");
            li.textContent = `${tasbeeh.name} (${tasbeeh.transliteration})`;
            li.dataset.index = index;
            // Check if this Tasbeeh exists in storage and highlight it
            let tasbeehItems = JSON.parse(localStorage.getItem("tasbeehItems")) || [];
            let existingTasbeeh = tasbeehItems.find(t => t.name.toLowerCase() === tasbeeh.name.toLowerCase());
            if (existingTasbeeh) {
                li.classList.add("selected");
                recommendedTasbeehCount.value = existingTasbeeh.limit; // Pre-fill count
            }
            li.addEventListener("click", function () {
                document.querySelectorAll("#recommendedTasbeehList li").forEach(item => item.classList.remove("selected"));
                li.classList.add("selected");
            });
            recommendedTasbeehList.appendChild(li);
        });
    }

    saveRecommendedBtn?.addEventListener("click", function () {
        const selectedTasbeeh = document.querySelector("#recommendedTasbeehList li.selected");
        const tasbeehLimit = parseInt(recommendedTasbeehCount?.value.trim());
        if (!selectedTasbeeh || isNaN(tasbeehLimit) || tasbeehLimit <= 0) {
            alert("Please select a Tasbeeh and enter a valid count.");
            return;
        }
        const tasbeehIndex = selectedTasbeeh.dataset.index;
        const selectedTasbeehData = recommendedTasbeehat[tasbeehIndex];
        let tasbeehItems = JSON.parse(localStorage.getItem("tasbeehItems")) || [];
        // Find the index of the existing Tasbeeh
        const existingTasbeehIndex = tasbeehItems.findIndex(t => t.name.toLowerCase() === selectedTasbeehData.name.toLowerCase());
        if (existingTasbeehIndex !== -1) {
            // Update the existing Tasbeeh's limit
            tasbeehItems[existingTasbeehIndex].limit = tasbeehLimit;
            tasbeehItems[existingTasbeehIndex].completed = tasbeehItems[existingTasbeehIndex].count >= tasbeehLimit;
        } else {
            // Add a new Tasbeeh
            const newTasbeeh = {
                name: selectedTasbeehData.name,
                transliteration: selectedTasbeehData.transliteration,
                count: 0,
                limit: tasbeehLimit,
                completed: false
            };
            tasbeehItems.push(newTasbeeh);
        }
        // Save back to local storage
        localStorage.setItem("tasbeehItems", JSON.stringify(tasbeehItems));
        // Dispatch event to notify UI update
        document.dispatchEvent(new CustomEvent("tasbeehAdded", { detail: { name: selectedTasbeehData.name } }));
        recommendedModal?.classList.remove("show");
    });
});