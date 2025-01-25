// scripts.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const timestampInput = document.getElementById("timestamp");

    form.addEventListener("submit", (e) => {
        if (!timestampInput.value) {
            e.preventDefault();
            alert("Please select a valid timestamp before searching.");
        }
    });
});
