<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search Diary Entries</title>
    <link rel="stylesheet" href="my_journal_styles.css">
</head>
<body>
    <div class="container">
        <h1>Search Diary Entries</h1>
        <form method="GET" action="">
            <label for="timestamp">Enter Timestamp:</label>
            <input type="datetime-local" id="timestamp" name="timestamp" required>
            <button type="submit" class="btn">Search</button>
        </form>

        <div class="results-container">
            <h2>Search Results</h2>
            <?php
            // Database connection settings
            $servername = "localhost"; // Replace with your server name
            $username = "root";        // Replace with your database username
            $password = "";            // Replace with your database password
            $dbname = "diary"; // Replace with your database name

            // Connect to the database
            $conn = new mysqli($servername, $username, $password, $dbname);

            // Check the connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            // Handle search
            if (isset($_GET['timestamp']) && !empty($_GET['timestamp'])) {
                $searchTimestamp = $_GET['timestamp'];

                // SQL query to fetch rows matching the timestamp
                $sql = "SELECT * FROM diary WHERE timestamp = ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("s", $searchTimestamp);
                $stmt->execute();
                $result = $stmt->get_result();

                // Display results
                if ($result->num_rows > 0) {
                    echo "<table border='1'>
                        <thead>
                            <tr>";

                    // Dynamically fetch column names
                    $fields = $result->fetch_fields();
                    foreach ($fields as $field) {
                        echo "<th>" . htmlspecialchars($field->name) . "</th>";
                    }

                    echo "</tr>
                        </thead>
                        <tbody>";

                    // Fetch and display rows
                    while ($row = $result->fetch_assoc()) {
                        echo "<tr>";
                        foreach ($row as $column) {
                            echo "<td>" . htmlspecialchars($column) . "</td>";
                        }
                        echo "</tr>";
                    }

                    echo "</tbody>
                    </table>";
                } else {
                    echo "<p>No entries found for the given timestamp.</p>";
                }

                $stmt->close();
            } else {
                echo "<p>Please enter a timestamp to search.</p>";
            }

            // Close the database connection
            $conn->close();
            ?>
        </div>
    </div>
    <script src="my_journal_scripts.js"></script>
</body>
</html>
