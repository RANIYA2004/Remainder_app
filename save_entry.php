<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

// Database connection
$host = 'localhost';
$username = 'root'; // Replace with your database username
$password = '';     // Replace with your database password
$dbname = 'diary';  // Your database name

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $response = ['success' => false, 'message' => ''];

        // Collect the text content
        $textContent = $_POST['text_content'] ?? null;

        // Handle media upload
        $mediaUrl = null;
        if (isset($_FILES['media']) && $_FILES['media']['error'] === UPLOAD_ERR_OK) {
            $uploadsDir = 'uploads';
            if (!is_dir($uploadsDir)) {
                mkdir($uploadsDir, 0777, true);
            }

            $fileName = uniqid() . '-' . basename($_FILES['media']['name']);
            $targetFile = $uploadsDir . '/' . $fileName;

            if (move_uploaded_file($_FILES['media']['tmp_name'], $targetFile)) {
                $mediaUrl = $targetFile;
            } else {
                throw new Exception('Failed to upload media file.');
            }
        }

        // Insert the entry into the database
        $stmt = $pdo->prepare("INSERT INTO entries (text, media_url) VALUES (:text, :media_url)");
        $stmt->execute([
            ':text' => $textContent,
            ':media_url' => $mediaUrl,
        ]);

        $response['success'] = true;
        $response['message'] = 'Entry saved successfully.';
        echo json_encode($response);
        exit;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
