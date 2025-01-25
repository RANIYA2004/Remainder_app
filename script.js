// Select elements
const recordButton = document.getElementById("record");
const scheduleTimeInput = document.getElementById("schedule-time");
const setReminderButton = document.getElementById("set-reminder");
const remindersList = document.getElementById("reminders-list");

let recordedReminder = "";

// 1. Record Voice Input
recordButton.addEventListener("click", () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
        recordedReminder = event.results[0][0].transcript;
        alert(`Reminder recorded: "${recordedReminder}"`);
    };

    recognition.onerror = () => {
        alert("An error occurred while recording.");
    };
});

// 2. Set Reminder with Notification
setReminderButton.addEventListener("click", () => {
    const scheduledTime = new Date(scheduleTimeInput.value);

    if (!recordedReminder || isNaN(scheduledTime)) {
        alert("Please record a reminder and set a valid time.");
        return;
    }

    // Calculate time difference
    const timeDiff = scheduledTime - new Date();

    if (timeDiff <= 0) {
        alert("Please choose a future time.");
        return;
    }

    // Schedule the reminder
    setTimeout(() => {
        new Notification("Reminder", {
            body: recordedReminder,
        });
    }, timeDiff);

    // Display in reminders list
    const listItem = document.createElement("li");
    listItem.textContent = `${recordedReminder} at ${scheduledTime.toLocaleString()}`;
    remindersList.appendChild(listItem);

    alert("Reminder set successfully!");
});

// 3. Request Notification Permission
if (Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
            alert("Notifications are required for reminders!");
        }
    });
}
