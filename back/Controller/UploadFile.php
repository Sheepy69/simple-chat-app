<?php

namespace Controller;

require('../Api/Api.php');

use Api\Api;
use Exception;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-Type: text/json");

$api = new Api();


if (0 < $_FILES['content']['error']) {
    die('test');
    throw  new Exception('Failed.', 404);
}

$config = file_get_contents('../config.json');
$config = json_decode($config, true);

$isUploaded = move_uploaded_file($_FILES['content']['tmp_name'], sprintf('./%s/%s', $config['REACT_APP_PROJECT_MEDIA_DIR'], $_FILES['content']['name']));

if (!$isUploaded) {
    throw  new Exception('Failed.');
}

file_put_contents('./log_'.date("j.n.Y").'.log', $_FILES, FILE_APPEND);

$api->sendMessage($_FILES['content']['name'], $_POST['meet'], (string)$_SERVER['REMOTE_ADDR']);

echo json_encode(['status' => 'sucess']);
die();