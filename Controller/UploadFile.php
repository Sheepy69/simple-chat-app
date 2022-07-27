<?php

namespace Controller;

require('../Api/Api.php');

use Api\Api;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-Type: text/json");

$api = new Api();

if (0 < $_FILES['content']['error']) {
    echo 'Error: ' . $_FILES['content']['error'] . '<br>';
    die();
}

move_uploaded_file($_FILES['content']['tmp_name'], sprintf('../uploads/%s', $_FILES['content']['name']));

$api->sendMessage($_FILES['content']['name']);

echo json_encode(['status' => 'sucess']);
die();