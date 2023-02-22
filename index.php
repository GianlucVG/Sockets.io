<?php 
// Mensaje de Consola 
$data = array(
    'message' => 'WebHook funcionando correctamente'
);

// Convertir datos a JSON
$json_data = json_encode($data);

// Configurar la solicitud HTTP POST
$url = 'http://localhost:3000/mi_evento';
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Ejecutar la solicitud HTTP POST
$response = curl_exec($ch);
curl_close($ch);

// Mensaje de confirmación
echo "Solicitud enviada: " . $json_data;
?>

// Terminal -> php index.php