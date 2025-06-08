<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/mercadopago.php';

// Verificar que la solicitud sea POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos de la notificación
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        http_response_code(400);
        exit('Datos inválidos');
    }

    // Verificar el tipo de notificación
    if (isset($data['type']) && $data['type'] === 'payment') {
        $payment_id = $data['data']['id'];
        
        // Obtener información del pago
        $mp = new MercadoPagoHandler();
        $payment = $mp->getPayment($payment_id);

        if ($payment) {
            // Actualizar el estado de la reserva en la base de datos
            $status = $payment['status'];
            $external_reference = $payment['external_reference'];
            
            // Aquí deberías actualizar el estado de la reserva en tu base de datos
            // Por ejemplo:
            // updateReservationStatus($external_reference, $status);
            
            // Registrar la notificación
            $log_file = 'payment_notifications.log';
            $log_message = date('Y-m-d H:i:s') . " - Payment ID: $payment_id, Status: $status\n";
            file_put_contents($log_file, $log_message, FILE_APPEND);
            
            http_response_code(200);
            exit('OK');
        }
    }
}

http_response_code(400);
exit('Solicitud inválida');
?> 