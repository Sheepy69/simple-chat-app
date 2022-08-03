<?php

namespace Controller;

require('../Api/Api.php');

use Api\Api;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-Type: text/json");

$api = new Api();

$meets = $api->getMeets();

$formattedData = [];

if (count($meets)) {
    foreach ($meets as $meet) {
        $formattedData[] = [
            'title' => $meet['title'],
            'id' => $meet['id'],
            'isSecure' => $meet['hash'] !== ''
        ];
    }
}

echo json_encode([$formattedData], true);

die();
