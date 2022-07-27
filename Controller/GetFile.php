<?php

namespace Controller;

require('../Api/Api.php');

use Api\Api;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-Type: text/json");

$api = new Api();


echo json_encode([
    'image' => sprintf('http://localhost:80/chat/uploads/%s', $_POST['image']),
], true);

die();
