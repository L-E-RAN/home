<?php
// save_cart.php

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $cartData = json_decode(file_get_contents('php://input'), true);
    
    // שמירת העגלה של המשתמש ב-session או מסד נתונים
    $_SESSION['cart'] = $cartData;

    // לדוגמה, שמירת העגלות במסד נתונים (או כל מבנה נתונים אחר)
    // כאן ניתן לעדכן את המלאי בשרת בהתאם למה שיש בעגלות של כולם.

    echo json_encode(['status' => 'success', 'message' => 'Cart updated successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
