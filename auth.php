<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "diary";

// Connect to the database
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submissions
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $conn->real_escape_string($_POST["email"]);
    $password = $conn->real_escape_string($_POST["password"]);

    if (isset($_POST["action"]) && $_POST["action"] == "register") {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $query = "INSERT INTO users (email, password) VALUES ('$email', '$hashedPassword')";
        if ($conn->query($query) === TRUE) {
            echo "Registration successful!";
        } else {
            echo "Error: " . $conn->error;
        }
    } elseif (isset($_POST["action"]) && $_POST["action"] == "login") {
        $query = "SELECT * FROM users WHERE email='$email'";
        $result = $conn->query($query);

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user["password"])) {
                echo "Login successful!";
            } else {
                echo "Invalid password!";
            }
        } else {
            echo "No user found with this email!";
        }
    }
}

$conn->close();
?>
