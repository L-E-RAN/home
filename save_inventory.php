<?php
// קבלת תוכן הבקשה שנשלחה מ-JavaScript
$data = json_decode(file_get_contents('php://input'), true);

// בדיקה אם יש נתונים חוקיים לעדכון המלאי
if (isset($data['products'])) {
    // קידוד המלאי לקובץ JSON
    file_put_contents('inventory.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No product data received']);
}
?>
