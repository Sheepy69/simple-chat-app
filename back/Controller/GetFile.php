<?php

namespace Controller;

require('../Api/Api.php');

use Api\Api;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-Type: text/json");

$api = new Api();

$config = file_get_contents('../config.json');
$config = json_decode($config, true);

echo json_encode([
    'image' => sprintf('%s%s/%s', $config['REACT_APP_PROJECT_ROOT_URL'], $config['REACT_APP_PROJECT_MEDIA_DIR'], $_POST['image']),
], true);

die();
