<?php

namespace Controller;

require('../Api/Api.php');

use Api\Api;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-Type: text/json");

$api = new Api();


function getDiffDate($dateString)
{
    $date = new \DateTime($dateString);
    $now = new \DateTime();

    $days = (int)$now->diff($date)->format("%a");
    if ($days > 0) {
        return sprintf('%s days', $days);
    }

    $hours = (int)$now->diff($date)->format("%H");
    if ($hours > 0) {
        return sprintf('%s hours', $hours);
    }

    $mins = (int)$now->diff($date)->format("%i");
    if ($mins > 0) {
        return sprintf('%s mins', $mins);
    }

    return 'now';
}

$messages = $api->getMessagesFromMeet($_POST['meet']);

foreach ($messages as $key => $message) {
    $messages[$key] = array_merge($message, ['diff_date' => getDiffDate($message['created_at'])]);
}

return [
    'messages' => array_reverse($messages),
    'users' => $api->getUsers()
];

