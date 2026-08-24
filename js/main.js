document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE START
    ===================================================== */

    history.scrollRestoration = "manual";

    window.scrollTo(0, 0);


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const luxuryOpening =
        document.getElementById("luxuryOpening");

    const waxSeal =
        document.getElementById("waxSeal");

    const website =
        document.getElementById("website");

    const audio =
        document.getElementById("wedding-audio");

    const audioButton =
        document.getElementById("audio-btn");


    /* =====================================================
       LUXURY ENVELOPE
    ===================================================== */

    waxSeal.addEventListener("click", async () => {

        /* Prevent second click */
        waxSeal.disabled = true;


        /* Seal animation */
        waxSeal.classList.add("cracking");


        /* Open envelope */
        setTimeout(() => {

            luxuryOpening.classList.add("opened");

        }, 450);


        /* Show website */
        setTimeout(() => {

            luxuryOpening.classList.add("finished");

            website.classList.add("show");

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
            });


            /* Try to start music */

            audio.volume = 0.7;

            audio.play()
                .then(() => {

                    audioButton.textContent = "🔊";

                })
                .catch(() => {

                    audioButton.textContent = "🔇";

                });

        }, 2600);

    });


    /* =====================================================
       AUDIO
    ===================================================== */

    let playing = false;


    audioButton.addEventListener("click", async () => {

        if (playing) {

            audio.pause();

            playing = false;

            audioButton.textContent = "🔇";

            return;
        }


        try {

            await audio.play();

            playing = true;

            audioButton.textContent = "🔊";

        } catch (error) {

            console.log("Audio could not be played.");

        }

    });


    /* =====================================================
       COUNTDOWN
    ===================================================== */

    const weddingDate =
        new Date("2026-10-23T18:00:00");


    function updateCountdown() {

        const difference =
            weddingDate.getTime() - Date.now();


        if (difference <= 0) {

            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";

            return;
        }


        const days =
            Math.floor(
                difference / (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (difference % (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (difference % (1000 * 60 * 60)) /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
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


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal-left, .reveal-right"
        );


    const observer =
        new IntersectionObserver(
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
