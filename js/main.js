document.addEventListener("DOMContentLoaded", () => {

    /* ===================================
            ALWAYS START FROM TOP
    =================================== */

    history.scrollRestoration = "manual";

    window.scrollTo(0, 0);


    /* ===================================
            ELEMENTS
    =================================== */

    const envelopeScreen = document.getElementById("envelope-screen");
    const envelope = document.querySelector(".envelope");
    const openButton = document.getElementById("openInvitation");
    const website = document.getElementById("website");

    const audio = document.getElementById("wedding-audio");
    const audioButton = document.getElementById("audio-btn");

    let playing = false;


    /* ===================================
            ENVELOPE OPEN
    =================================== */

    openButton.addEventListener("click", async () => {

        // Ապահովում ենք, որ կայքը բացվի ամենասկզբից
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });

        envelope.classList.add("open");


        setTimeout(() => {

            envelopeScreen.classList.add("hide");
            website.classList.add("show");

            // Envelope-ից հետո նույնպես վերևից
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
            });

        }, 1000);


        /* ---------- AUDIO ---------- */

        try {

            audio.volume = 0.7;

            await audio.play();

            playing = true;
            audioButton.innerHTML = "🔊";

        } catch (error) {

            console.log("Audio waiting for user interaction");

        }

    });


    /* ===================================
            AUDIO BUTTON
    =================================== */

    audioButton.addEventListener("click", async () => {

        if (playing) {

            audio.pause();

            audioButton.innerHTML = "🔇";

            playing = false;

        } else {

            try {

                await audio.play();

                audioButton.innerHTML = "🔊";

                playing = true;

            } catch (error) {

                console.log("Audio could not be played");

            }

        }

    });


    /* ===================================
            COUNTDOWN
    =================================== */

    const weddingDate = new Date("2026-10-23T18:00:00");

    function updateCountdown() {

        const difference = weddingDate - new Date();

        if (difference <= 0) {

            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";

            return;
        }


        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (difference % (1000 * 60)) /
            1000
        );


        document.getElementById("days").textContent =
            String(days).padStart(2, "0");

        document.getElementById("hours").textContent =
            String(hours).padStart(2, "0");

        document.getElementById("minutes").textContent =
            String(minutes).padStart(2, "0");

        document.getElementById("seconds").textContent =
            String(seconds).padStart(2, "0");
    }

    updateCountdown();

    setInterval(updateCountdown, 1000);


    /* ===================================
            SCROLL ANIMATION
    =================================== */

    const revealElements = document.querySelectorAll(
        ".reveal-left, .reveal-right"
    );

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }

            });

        },
        {
            threshold: 0.2
        }
    );


    revealElements.forEach((element) => {
        observer.observe(element);
    });

});
