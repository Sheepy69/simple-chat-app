<?php

namespace Controller;

require('../Api/Api.php');

use Api\Api;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-Type: text/json; charset=utf-8");

$api = new Api();

$api->sendMessage(addslashes($_POST['content']), $_POST['meet'], $_SERVER['REMOTE_ADDR']);
$api->createUser($_SERVER['REMOTE_ADDR']);

return $_POST;
