document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Countdown ---------- */

    const weddingDate = new Date("2026-10-23T00:00:00");

    function updateCountdown() {
        const now = new Date();
        const diff = weddingDate.getTime() - now.getTime();

        if (diff <= 0) {
            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = String(days).padStart(2, "0");
        document.getElementById("hours").textContent = String(hours).padStart(2, "0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
        document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* ---------- Audio player ---------- */

    const audio = document.getElementById("wedding-audio");
    const btn = document.getElementById("audio-btn");
    let isPlaying = false;

    // Փորձ autoplay-ի համար (muted → unmute workaround)
    async function tryAutoplay() {
        try {
            audio.muted = false;
            await audio.play();
            isPlaying = true;
            btn.textContent = "❚❚";
        } catch (err) {
            isPlaying = false;
            btn.textContent = "▶";
        }
    }

    tryAutoplay();

    btn.addEventListener("click", async () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            btn.textContent = "▶";
        } else {
            try {
                audio.muted = false;
                await audio.play();
                isPlaying = true;
                btn.textContent = "❚❚";
            } catch (err) {
                console.log("Play failed", err);
            }
        }
    });

});
