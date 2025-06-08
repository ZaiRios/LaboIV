<?php
require_once __DIR__ . '/mercadopago.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos inválidos']);
        exit;
    }

    // Validar datos requeridos
    $requiredFields = ['nombre', 'email', 'telefono', 'fecha_inicio', 'fecha_fin', 'franquicia'];
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            http_response_code(400);
            echo json_encode(['error' => "El campo {$field} es requerido"]);
            exit;
        }
    }

    try {
        $mp = new MercadoPagoHandler();

        // Crear la reserva en la base de datos
        $reservationData = [
            'id' => uniqid('RES-'),
            'nombre' => $data['nombre'],
            'email' => $data['email'],
            'telefono' => $data['telefono'],
            'fecha_inicio' => $data['fecha_inicio'],
            'fecha_fin' => $data['fecha_fin'],
            'franquicia' => $data['franquicia'],
            'car_name' => $data['car_name'] ?? 'Vehículo seleccionado',
            'status' => 'pending'
        ];

        // Crear la preferencia de pago para el depósito
        $preference = $mp->createDepositPreference($reservationData);

        if ($preference) {
            echo json_encode([
                'success' => true,
                'preference_id' => $preference['id'],
                'init_point' => $preference['init_point']
            ]);
        } else {
            throw new Exception('Error al crear la preferencia de pago');
        }
    } catch (Exception $e) {
        error_log("Error processing reservation: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Error al procesar la reserva']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}
?> 