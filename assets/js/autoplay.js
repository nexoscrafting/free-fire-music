document.addEventListener("DOMContentLoaded", function() {
    const musicPlayer = document.getElementById("disc");

    // Autoplay the music when the page loads
    musicPlayer.play().catch(error => {
        console.error("Autoplay failed:", error);
        // Autoplay might fail due to browser restrictions, inform the user if needed.
    });
});
