document.addEventListener("DOMContentLoaded", () => {



    /* ===================================
            ENVELOPE OPEN
    =================================== */


    const envelopeScreen = document.getElementById(
        "envelope-screen"
    );


    const envelope = document.querySelector(
        ".envelope"
    );


    const openButton = document.getElementById(
        "openInvitation"
    );


    const website = document.getElementById(
        "website"
    );



    const audio = document.getElementById(
        "wedding-audio"
    );



    openButton.addEventListener("click", async () => {


        envelope.classList.add("open");


        setTimeout(() => {


            envelopeScreen.classList.add("hide");


            website.classList.add("show");


        }, 1000);




        try {

            audio.volume = 0.7;

            await audio.play();

            playing = true;

            audioButton.innerHTML = "🔊";

        } catch (error) {

            console.log(
                "Audio waiting for user interaction"
            );

        }



    });






    /* ===================================
            AUDIO BUTTON
    =================================== */


    const audioButton = document.getElementById(
        "audio-btn"
    );

    let playing = false;



    audioButton.addEventListener(
        "click",
        async () => {

            if (playing) {

                audio.pause();

                audioButton.innerHTML = "🔇";

                playing = false;

            } else {

                await audio.play();

                audioButton.innerHTML = "🔊";

                playing = true;

            }

        });








    /* ===================================
            COUNTDOWN
    =================================== */


    const weddingDate =
        new Date(
            "2026-10-23T18:00:00"
        );




    function updateCountdown() {



        const now = new Date();



        const difference =
            weddingDate - now;



        if (difference <= 0) {

            document.getElementById("days").innerHTML = "00";
            document.getElementById("hours").innerHTML = "00";
            document.getElementById("minutes").innerHTML = "00";
            document.getElementById("seconds").innerHTML = "00";

            return;

        }



        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );



        const hours =
            Math.floor(
                (difference %
                    (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );



        const minutes =
            Math.floor(
                (difference %
                    (1000 * 60 * 60)) /
                (1000 * 60)
            );



        const seconds =
            Math.floor(
                (difference %
                    (1000 * 60)) /
                1000
            );




        document.getElementById(
                "days"
            ).innerHTML =
            String(days).padStart(2, "0");



        document.getElementById(
                "hours"
            ).innerHTML =
            String(hours).padStart(2, "0");



        document.getElementById(
                "minutes"
            ).innerHTML =
            String(minutes).padStart(2, "0");



        document.getElementById(
                "seconds"
            ).innerHTML =
            String(seconds).padStart(2, "0");



    }



    updateCountdown();


    setInterval(
        updateCountdown,
        1000
    );







    /* ===================================
            SCROLL ANIMATION
    =================================== */


    const revealElements =
        document.querySelectorAll(
            ".reveal-left, .reveal-right"
        );



    const observer =
        new IntersectionObserver(
            (entries) => {


                entries.forEach(
                    (entry) => {


                        if (entry.isIntersecting) {


                            entry.target.classList.add(
                                "active"
                            );


                        }


                    });


            }, {

                threshold: 0.2

            });





    revealElements.forEach(
        (element) => {


            observer.observe(element);



        });



});