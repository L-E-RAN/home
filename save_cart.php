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

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $cartData = json_decode(file_get_contents('php://input'), true);
    
    // שמירת העגלה של המשתמש במסד הנתונים
    $userId = session_id(); // מזהה ייחודי למשתמש (לדוגמה לפי session ID)
    $cartItems = json_encode($cartData); // המרת העגלה ל-JSON
    
    // בדיקת קיום עגלה קודמת ועדכון אם יש צורך
    $stmt = $conn->prepare("REPLACE INTO carts (user_id, cart_data) VALUES (?, ?)");
    $stmt->bind_param("ss", $userId, $cartItems);
    
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Cart updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update cart']);
    }
    
    $stmt->close();
}

$conn->close();
?>
