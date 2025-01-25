// scripts.js

document.addEventListener("DOMContentLoaded", () => {
    const addEntryButton = document.getElementById("addEntryButton");
    const addEntryModal = document.getElementById("addEntryModal");
    const closeModal = document.getElementById("closeModal");
    const addEntryForm = document.getElementById("addEntryForm");
    const entriesContainer = document.getElementById("entriesContainer");
    const searchButton = document.getElementById("searchButton");
    const searchDate = document.getElementById("searchDate");
    const cameraButton = document.getElementById("cameraButton");
    const videoPreview = document.getElementById("videoPreview");
    const capturePhotoButton = document.getElementById("capturePhoto");
    const stopCameraButton = document.getElementById("stopCamera");

    let videoStream = null;

    // Open modal for adding a new entry
    addEntryButton.addEventListener("click", () => {
        addEntryModal.classList.add("show");
    });

    // Close modal
    closeModal.addEventListener("click", () => {
        addEntryModal.classList.remove("show");
    });

    // Handle form submission
    addEntryForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const entryText = document.getElementById("entryText").value;
        const entryMedia = document.getElementById("entryMedia").files[0];

        // Create a new entry element
        const entryElement = document.createElement("div");
        entryElement.classList.add("entry");

        const textElement = document.createElement("p");
        textElement.textContent = entryText;
        entryElement.appendChild(textElement);

        if (entryMedia) {
            const mediaElement = createMediaElement(entryMedia);
            if (mediaElement) {
                entryElement.appendChild(mediaElement);
            }
        }

        entriesContainer.appendChild(entryElement);

        // Clear the form and close the modal
        addEntryForm.reset();
        addEntryModal.classList.remove("show");
    });

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

    // Handle camera functionality
    cameraButton.addEventListener("click", async () => {
        try {
            videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoPreview.srcObject = videoStream;
            videoPreview.style.display = "block";
            videoPreview.play();
        } catch (error) {
            alert("Unable to access the camera: " + error.message);
        }
    });

    capturePhotoButton.addEventListener("click", () => {
        if (!videoStream) return;

        const canvas = document.createElement("canvas");
        canvas.width = videoPreview.videoWidth;
        canvas.height = videoPreview.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(videoPreview, 0, 0, canvas.width, canvas.height);

        const img = document.createElement("img");
        img.src = canvas.toDataURL("image/png");
        img.alt = "Captured Photo";
        img.style.maxWidth = "100%";
        entriesContainer.appendChild(img);
    });

    stopCameraButton.addEventListener("click", () => {
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
            videoPreview.srcObject = null;
            videoPreview.style.display = "none";
        }
    });

    // Helper function to create a media element (image, video, or audio)
    function createMediaElement(file) {
        const fileType = file.type;

        if (fileType.startsWith("image/")) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.alt = "Uploaded Image";
            img.style.maxWidth = "100%";
            img.style.borderRadius = "8px";
            return img;
        } else if (fileType.startsWith("video/")) {
            const video = document.createElement("video");
            video.src = URL.createObjectURL(file);
            video.controls = true;
            video.style.maxWidth = "100%";
            return video;
        } else if (fileType.startsWith("audio/")) {
            const audio = document.createElement("audio");
            audio.src = URL.createObjectURL(file);
            audio.controls = true;
            return audio;
        } else {
            alert("Unsupported file type: " + fileType);
            return null;
        }
    }
});
