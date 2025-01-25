document.addEventListener("DOMContentLoaded", () => {
    const addEntryButton = document.getElementById("addEntryButton");
    const saveEntryButton = document.getElementById("saveEntryButton");
    const addEntryContainer = document.getElementById("addEntryContainer");
    const entriesContainer = document.getElementById("entriesContainer");
    const entryText = document.getElementById("entryText");
    const entryMedia = document.getElementById("entryMedia");
    const cameraButton = document.getElementById("cameraButton");
    const videoPreview = document.getElementById("videoPreview");
    const stopCameraButton = document.getElementById("stopCameraButton");

    let videoStream = null;

    // Show the Add Entry Section
    addEntryButton.addEventListener("click", () => {
        addEntryContainer.style.display = "flex";
    });

    // Save the Entry
    saveEntryButton.addEventListener("click", () => {
        const text = entryText.value;
        const mediaFile = entryMedia.files[0];

        if (!text && !mediaFile && !videoStream) {
            alert("Please write something or upload a media file.");
            return;
        }

        const entryElement = document.createElement("div");
        entryElement.classList.add("entry");

        // Add Text
        if (text) {
            const textElement = document.createElement("p");
            textElement.textContent = text;
            entryElement.appendChild(textElement);
        }

        // Add Media
        if (mediaFile) {
            const mediaElement = createMediaElement(mediaFile);
            if (mediaElement) {
                entryElement.appendChild(mediaElement);
            }
        }

        // Add Video Capture
        if (videoStream) {
            const canvas = document.createElement("canvas");
            canvas.width = videoPreview.videoWidth;
            canvas.height = videoPreview.videoHeight;
            const context = canvas.getContext("2d");
            context.drawImage(videoPreview, 0, 0, canvas.width, canvas.height);

            const img = document.createElement("img");
            img.src = canvas.toDataURL("image/png");
            img.alt = "Captured Photo";
            img.style.maxWidth = "100%";
            img.style.borderRadius = "8px";
            entryElement.appendChild(img);
        }

        entriesContainer.appendChild(entryElement);

        // Reset Form
        resetForm();
    });

    // Enable Camera
    cameraButton.addEventListener("click", async () => {
        try {
            videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoPreview.srcObject = videoStream;
            videoPreview.style.display = "block";
            videoPreview.play();
            stopCameraButton.style.display = "block";
        } catch (error) {
            alert("Unable to access the camera: " + error.message);
        }
    });

    // Stop Camera
    stopCameraButton.addEventListener("click", () => {
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
            videoPreview.srcObject = null;
            videoPreview.style.display = "none";
            stopCameraButton.style.display = "none";
            videoStream = null;
        }
    });

    // Reset Form
    function resetForm() {
        entryText.value = "";
        entryMedia.value = "";
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
            videoPreview.srcObject = null;
            videoPreview.style.display = "none";
            stopCameraButton.style.display = "none";
            videoStream = null;
        }
        addEntryContainer.style.display = "none";
    }

    // Create Media Element
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
        } else {
            alert("Unsupported file type: " + fileType);
            return null;
        }
    }
});
