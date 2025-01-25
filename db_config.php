<?php
$host = "localhost";  // Database host
$dbname = "diary";  // Database name
$username = "root";  // Default MySQL username
$password = "";  // Default MySQL password (empty in XAMPP)

try {
    // Create a PDO instance
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
