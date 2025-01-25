<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "diary";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle POST requests to save entries
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $textContent = $_POST['text_content'];
    $mediaPath = "";

    // Handle file upload
    if (isset($_FILES['media']) && $_FILES['media']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = "uploads/";
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $fileName = basename($_FILES['media']['name']);
        $mediaPath = $uploadDir . $fileName;
        move_uploaded_file($_FILES['media']['tmp_name'], $mediaPath);
    }

    $stmt = $conn->prepare("INSERT INTO entries (text, media_url) VALUES (?, ?)");
    $stmt->bind_param("ss", $textContent, $mediaPath);
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Entry saved successfully!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to save entry."]);
    }
    $stmt->close();
}

// Handle GET requests to fetch entries
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM entries ORDER BY created_at DESC");
    $entries = [];
    while ($row = $result->fetch_assoc()) {
        $entries[] = $row;
    }
    echo json_encode($entries);
}

$conn->close();
?>
