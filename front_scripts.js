// Log initialization
console.log("Memories initialized.");

// Select buttons
const newJournalButton = document.querySelector(".new-journal-button");
const journalCard = document.querySelector(".journal-card");

// Event listener for New Journal button
newJournalButton.addEventListener("click", () => {
    window.location.href = "new_entry.html"; 
});

// Event listener for Journal Card
journalCard.addEventListener("click", () => {
    window.location.href = "index.html"; 
});
