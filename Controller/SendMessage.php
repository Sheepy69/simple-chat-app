<?php

namespace Controller;

require('../Api/Api.php');

use Api\Api;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-Type: text/json");

$api = new Api();

$api->sendMessage($_POST['content'], $_POST['user']);

echo json_encode(['staus' => 'sucess']);
die();