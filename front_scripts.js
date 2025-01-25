// Log initialization
console.log("Memories initialized.");

// Select buttons
const newJournalButton = document.querySelector(".new-journal-button");
const journalCard = document.querySelector(".journal-card");

// Event listener for New Journal button
newJournalButton.addEventListener("click", () => {
    window.location.href = "index.html"; // Redirect to index.html
});

// Event listener for Journal Card
journalCard.addEventListener("click", () => {
    window.location.href = "journal.html"; // Redirect to journal.html
});
