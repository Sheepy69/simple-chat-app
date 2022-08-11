<?php

namespace Controller;

require('../Api/Api.php');

use Api\Api;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-Type: text/json; charset=utf-8");

$api = new Api();

return ['isAuth' => $api->authMeet($_POST['meet'], $_POST['passwd'])];
