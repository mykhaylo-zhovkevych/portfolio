document.addEventListener('DOMContentLoaded', function() {
    // Funktion zur Initialisierung der Kartenhöhen-Logik
    function initializeMapHeights() {
        const mapDivs = document.querySelectorAll(".map > div");
        console.log("Anzahl der mapDivs:", mapDivs.length);

        const sectionsDivs = document.querySelectorAll(".section > .sec");
        console.log("Anzahl der sectionsDivs:", sectionsDivs.length);

        const sectionHeights = [];
        const accumulatedHeights = [];
        const RATIO = 0.5;

        let accumulatedHeight = 0;

        sectionsDivs.forEach((section, index) => {
            const height = section.clientHeight;
            console.log(`Höhe der Sektion ${index}:`, height);

            if (height === 0) {
                console.log(`Warnung: Sektionshöhe ${index} ist 0, überprüfen Sie die Sichtbarkeit und das Rendering dieser Sektion.`);
            }
            sectionHeights.push(height * RATIO);
            accumulatedHeight += height;
            accumulatedHeights.push(accumulatedHeight);
        });

        console.log("sectionHeights:", sectionHeights);
        console.log("accumulatedHeights:", accumulatedHeights);

        let lastActiveIndex = -1;

        function updateMapHeights(scrollPos) {
            console.log("Aktuelle Scroll-Position:", scrollPos);
            for (let i = 0; i < accumulatedHeights.length; i++) {
                console.log(`Prüfung des Index ${i}, Scroll-Position ${scrollPos}, Zielhöhe ${accumulatedHeights[i]}`);
                if ((i === 0 && scrollPos < accumulatedHeights[i]) || (i > 0 && scrollPos >= accumulatedHeights[i - 1] && scrollPos < accumulatedHeights[i])) {
                    if (lastActiveIndex !== i) {
                        if (lastActiveIndex >= 0) {
                            mapDivs[lastActiveIndex].style.height = "100px";
                        }
                        mapDivs[i].style.height = `${sectionHeights[i]}px`;
                        lastActiveIndex = i;
                    }
                    break;
                }
            }
        }

        const sectionElement = document.querySelector(".section");
        if (sectionElement) {
            sectionElement.addEventListener("scroll", () => {
                const scrollPos = sectionElement.scrollTop;
                console.log("Scroll-Event, Scroll-Position:", scrollPos);

                const sectionTotalHeight = [...sectionsDivs].reduce((sum, section) => sum + section.clientHeight, 0);
                console.log("Gesamthöhe der Sektionen:", sectionTotalHeight);

                const mapTotalHeight = [...mapDivs].reduce((sum, mapDiv) => sum + mapDiv.clientHeight, 0);
                console.log("Gesamthöhe der Karte:", mapTotalHeight);

                const sectionsScrollableHeight = Math.max(sectionTotalHeight - sectionElement.clientHeight, 0);
                const mapScrollableHeight = Math.max(mapTotalHeight - sectionElement.clientHeight, 0);

                const scrollRatio = sectionsScrollableHeight ? mapScrollableHeight / sectionsScrollableHeight : 0;
                console.log("Scroll-Verhältnis:", scrollRatio);

                const mapTranslateY = Math.min(scrollPos * scrollRatio, mapScrollableHeight);
                console.log("Berechnete Y-Translation für die Karte:", mapTranslateY);
                document.querySelector(".map").style.transform = `translateY(-${mapTranslateY}px)`;

                updateMapHeights(scrollPos);
            });
        } else {
            console.log("Das Element .section wurde nicht gefunden.");
        }
    }

    // Verzögerte Initialisierung, um sicherzustellen, dass alle Inhalte geladen sind
    setTimeout(initializeMapHeights, 30000);  // Anpassen basierend auf der benötigten Zeit für das Laden Ihrer Inhalte
});
