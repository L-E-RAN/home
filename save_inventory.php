<?php
$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['products'])) {
    file_put_contents('inventory.json', json_encode($data));
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error']);
}
?>
