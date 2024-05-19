document.querySelector('#check-speed-button').addEventListener('click', (e) => {
    var imageLink = 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Tokyo_Sky_Tree_2012.JPG',
        downloadSize = 8185374,
        time_start, time_end,
        downloadSrc = new Image();
    
    document.querySelector('.loader-content-INT').classList.add('hide-INT');
    document.querySelector('.loader-INT').classList.remove('hide-INT');

    time_start = new Date().getTime();
    
    var cacheImg = "?nn=" + time_start;
    downloadSrc.src = imageLink + cacheImg;
    
    downloadSrc.onload = function () {
        // Diese Funktion wird ausgelöst, wenn das Bild geladen wird 
        time_end = new Date().getTime();
        var timeDuration = (time_end - time_start) / 1000; // Umrechnung in Sekunden

        var loadedBytes = downloadSize * 8; // In Bits umrechnen
        var totalSpeed = ((loadedBytes / timeDuration) / 1024 / 1024).toFixed(2); // In Mbps umrechnen

        let i = 0;

        const animate = () => {
            if (i < totalSpeed) {
                document.querySelector('.content-INT').innerHTML = i.toFixed(2) + '<small> Mbps</small>';
                setTimeout(animate, 2.5);
                i += 1.02;
            } else {
                document.querySelector('.content-INT').innerHTML = totalSpeed + '<small> Mbps</small>';
            }
        };

        animate();

        document.querySelector('.loader-content-INT').classList.remove('hide-INT');
        document.querySelector('.loader-content-INT').classList.add('result-INT');
        document.querySelector('.loader-INT').classList.add('hide-INT');
        document.querySelector('.content-INT').classList.remove('hide-INT');
        e.target.innerText = 'CHECK AGAIN';
    };

    // Fehlerbehandlung hinzufügen
    downloadSrc.onerror = function () {
        alert("Fehler beim Laden des Bildes. Bitte versuchen Sie es erneut.");
        document.querySelector('.loader-content-INT').classList.remove('hide-INT');
        document.querySelector('.loader-INT').classList.add('hide-INT');
        document.querySelector('.content-INT').classList.add('hide-INT');
        e.target.innerText = 'TRY AGAIN';
    };
});