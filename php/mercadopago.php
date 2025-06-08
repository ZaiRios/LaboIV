<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/../vendor/autoload.php';

use MercadoPago\SDK;
use MercadoPago\Payment;
use MercadoPago\Preference;

class MercadoPagoHandler {
    private $accessToken;
    private $publicKey;
    private $mp;

    public function __construct() {
        $this->accessToken = MP_ACCESS_TOKEN;
        $this->publicKey = MP_PUBLIC_KEY;
        $this->mp = new MP($this->accessToken);
    }

    public function createPreference($reservationData) {
        try {
            $preference = new Preference();

            // Configurar el ítem
            $item = new MercadoPago\Item();
            $item->title = $reservationData['car_name'];
            $item->quantity = 1;
            $item->unit_price = $reservationData['price_per_day'];
            $item->currency_id = CURRENCY;

            $preference->items = array($item);

            // Configurar URLs de retorno
            $preference->back_urls = array(
                "success" => SITE_URL . "/success.php",
                "failure" => SITE_URL . "/failure.php",
                "pending" => SITE_URL . "/pending.php"
            );

            // Configurar notificaciones
            $preference->notification_url = SITE_URL . "/notifications.php";

            // Configurar el modo de pago
            $preference->payment_methods = array(
                "excluded_payment_types" => array(
                    array("id" => "ticket")
                ),
                "installments" => 1
            );

            // Guardar la preferencia
            $preference->save();

            return array(
                'success' => true,
                'preference_id' => $preference->id,
                'public_key' => $this->publicKey
            );
        } catch (Exception $e) {
            return array(
                'success' => false,
                'error' => $e->getMessage()
            );
        }
    }

    public function processPayment($paymentData) {
        try {
            $payment = new Payment();
            $payment->transaction_amount = $paymentData['amount'];
            $payment->token = $paymentData['token'];
            $payment->description = $paymentData['description'];
            $payment->installments = 1;
            $payment->payment_method_id = $paymentData['payment_method_id'];
            $payment->payer = array(
                "email" => $paymentData['email']
            );

            $payment->save();

            return array(
                'success' => true,
                'payment_id' => $payment->id,
                'status' => $payment->status
            );
        } catch (Exception $e) {
            return array(
                'success' => false,
                'error' => $e->getMessage()
            );
        }
    }

    public function createDepositPreference($reservationData) {
        try {
            $preference_data = [
                "items" => [
                    [
                        "id" => "deposit-" . $reservationData['id'],
                        "title" => "Depósito en garantía - " . $reservationData['car_name'],
                        "description" => "Depósito en garantía para alquiler de vehículo",
                        "quantity" => 1,
                        "currency_id" => "ARS",
                        "unit_price" => $reservationData['franquicia'] === 'completa' ? 480000 : 240000
                    ]
                ],
                "payment_methods" => [
                    "excluded_payment_types" => [
                        ["id" => "ticket"],
                        ["id" => "atm"]
                    ],
                    "installments" => 1
                ],
                "back_urls" => [
                    "success" => SITE_URL . "/success.php",
                    "failure" => SITE_URL . "/failure.php",
                    "pending" => SITE_URL . "/pending.php"
                ],
                "auto_return" => "approved",
                "external_reference" => $reservationData['id'],
                "notification_url" => SITE_URL . "/notifications.php",
                "statement_descriptor" => "DRIVEAR DEPOSITO",
                "expires" => true,
                "expiration_date_from" => date('c'),
                "expiration_date_to" => date('c', strtotime('+48 hours')),
                "metadata" => [
                    "reservation_id" => $reservationData['id'],
                    "franquicia_type" => $reservationData['franquicia'],
                    "is_deposit" => true
                ]
            ];

            $preference = $this->mp->create_preference($preference_data);
            return $preference;
        } catch (Exception $e) {
            error_log("Error creating deposit preference: " . $e->getMessage());
            return false;
        }
    }

    public function processDeposit($paymentId) {
        try {
            $payment = $this->mp->get_payment($paymentId);
            
            if ($payment && $payment['status'] === 'approved') {
                // Actualizar el estado del depósito en la base de datos
                $this->updateDepositStatus($payment['external_reference'], 'approved');
                return true;
            }
            
            return false;
        } catch (Exception $e) {
            error_log("Error processing deposit: " . $e->getMessage());
            return false;
        }
    }

    private function updateDepositStatus($reservationId, $status) {
        try {
            // Aquí deberías implementar la lógica para actualizar el estado del depósito en tu base de datos
            $sql = "UPDATE reservations SET deposit_status = ? WHERE id = ?";
            $stmt = $this->db->prepare($sql);
            return $stmt->execute([$status, $reservationId]);
        } catch (Exception $e) {
            error_log("Error updating deposit status: " . $e->getMessage());
            return false;
        }
    }

    public function releaseDeposit($reservationId) {
        try {
            // Aquí deberías implementar la lógica para liberar el depósito
            // Esto podría incluir una llamada a la API de Mercado Pago para liberar la retención
            $sql = "UPDATE reservations SET deposit_status = 'released' WHERE id = ?";
            $stmt = $this->db->prepare($sql);
            return $stmt->execute([$reservationId]);
        } catch (Exception $e) {
            error_log("Error releasing deposit: " . $e->getMessage());
            return false;
        }
    }
}
?> 