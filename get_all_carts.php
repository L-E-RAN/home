<?php
// get_all_carts.php

session_start();

// שליפת כל העגלות מה-session או ממסד נתונים
$allCarts = []; // כאן צריך לשלוף את כל העגלות של כל המשתמשים (לדוגמה ממסד נתונים)

if (isset($_SESSION['cart'])) {
    $allCarts[] = $_SESSION['cart'];
}

// שליחת כל העגלות
header('Content-Type: application/json');
echo json_encode($allCarts);
?>
