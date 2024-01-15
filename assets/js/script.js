document.addEventListener('DOMContentLoaded', function () {
    // Define the start date and the end date
    const startDate = new Date(); // Assuming the countdown starts now
    const endDate = new Date(2025, 7, 31); // August 31, 2025

    // Calculate the total duration in weeks
    const totalDurationWeeks = Math.trunc((endDate - startDate) / (1000 * 60 * 60 * 24 * 7));

    function weeksUntilMeeting() {
        const now = new Date();
        const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
        const weeks = Math.trunc((endDate - now) / millisecondsPerWeek);
        return weeks;
    }

    function updateCountdown() {
        const weeks = weeksUntilMeeting();
        const countdownElement = document.getElementById('countdown');
        const progressBarElement = document.getElementById('progress');

        // Calculate the progress based on the time elapsed
        const timeElapsed = startDate - new Date();
        const elapsedWeeks = Math.floor(timeElapsed / (1000 * 60 * 60 * 24 * 7));
        const progress = ((totalDurationWeeks - weeks) / totalDurationWeeks) * 100;

        countdownElement.textContent = weeks;
        progressBarElement.style.width = `${progress}%`;
    }

    // Update the countdown and progress bar immediately and every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
});
