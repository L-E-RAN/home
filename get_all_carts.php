<?php
// פרטי ההתחברות למסד הנתונים
$host = "sql310.infinityfree.com";
$dbname = "if0_37245387_new";
$username = "if0_37245387";
$password = "pt4gwhjv";

// יצירת חיבור למסד הנתונים
$conn = new mysqli($host, $username, $password, $dbname);

// בדיקת החיבור
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// שליפת כל העגלות ממסד הנתונים
$result = $conn->query("SELECT cart_data FROM carts");
$carts = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $carts[] = json_decode($row['cart_data'], true);
    }
}

// שליחת כל העגלות בתגובה בפורמט JSON
header('Content-Type: application/json');
echo json_encode($carts);

$conn->close();
?>
