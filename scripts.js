document.addEventListener("DOMContentLoaded", () => {
    const entriesContainer = document.getElementById("entriesContainer");
    const searchButton = document.getElementById("searchButton");
    const searchDate = document.getElementById("searchDate");

    // Add dummy entries for demonstration
    addDummyEntries();

    // Handle search functionality
    searchButton.addEventListener("click", () => {
        const date = searchDate.value;
        if (date) {
            alert(`Search functionality for ${date} is not implemented yet.`);
            // Add backend integration here to fetch entries by date
        } else {
            alert("Please select a date to search.");
        }
    });

    // Function to add dummy entries
    function addDummyEntries() {
        for (let i = 1; i <= 3; i++) {
            const entryElement = createEntryElement(`Sample Entry ${i}`);
            entriesContainer.appendChild(entryElement);
        }
    }

    // Function to create a new entry element
    function createEntryElement(text) {
        const entryElement = document.createElement("div");
        entryElement.classList.add("entry");

        const textElement = document.createElement("p");
        textElement.textContent = text;

        // Add action buttons
        const actionsContainer = document.createElement("div");
        actionsContainer.classList.add("entry-actions");

        const saveButton = document.createElement("button");
        saveButton.classList.add("btn", "save-btn");
        saveButton.textContent = "Save";
        saveButton.addEventListener("click", () => {
            alert(`Saved: "${text}"`);
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "delete-btn");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this entry?")) {
                entriesContainer.removeChild(entryElement);
            }
        });

        actionsContainer.appendChild(saveButton);
        actionsContainer.appendChild(deleteButton);

        entryElement.appendChild(textElement);
        entryElement.appendChild(actionsContainer);

        return entryElement;
    }
});
