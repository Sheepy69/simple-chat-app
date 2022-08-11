<?php

namespace Controller;

require('../Api/Api.php');

use Api\Api;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-Type: text/json; charset=utf-8");

$api = new Api();

$isSecure = isset($_POST['passwd']) && $_POST['passwd'];

if ($isSecure) {
    $api->createMeet(addslashes($_POST['title']), $_POST['passwd']);
} else {
    $api->createMeet(addslashes($_POST['title']));
}

unset($_POST['passwd']); // secure passwd

return $_POST;
