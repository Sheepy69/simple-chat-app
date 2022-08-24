<?php
require '../vendor/autoload.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;

$config = [
    'settings' => [
        'addContentLengthHeader' => false,
    ]
];

function setHeaders(Response $response)
{
    $response->withHeader('Access-Control-Allow-Origin', 'http://mysite')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
}

$app = new App($config);

$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write("Hello, 'dada'");
    return $response;
});

$app->post('/AuthToMeet', function (Request $request, Response $response, $args) {
    setHeaders($response);

    $payload = require '../Controller/AuthToMeet.php';
    return $response->withJson($payload, 200);
});

$app->post('/CreateMeet', function (Request $request, Response $response, $args) {
    setHeaders($response);

    $payload = require '../Controller/CreateMeet.php';
    return $response->withJson($payload, 200);
});

$app->post('/GetAppData', function (Request $request, Response $response, $args) {
    setHeaders($response);

    $payload = require '../Controller/GetAppData.php';
    return $response->withJson($payload, 200);
});

$app->post('/GetFile', function (Request $request, Response $response, $args) {
    setHeaders($response);

    $payload = require '../Controller/GetFile.php';
    return $response->withJson($payload, 200);
});

$app->post('/GetMeet', function (Request $request, Response $response, $args) {
    setHeaders($response);

    $payload = require '../Controller/GetMeet.php';
    return $response->withJson($payload, 200);
});

$app->get('/GetMeetFile', function (Request $request, Response $response, $args) {
    setHeaders($response);

    $payload = require '../Controller/GetMeetFile.php';
    return $response->withJson($payload, 200);
});

$app->post('/SendMessage', function (Request $request, Response $response, $args) {
    setHeaders($response);

    $payload = require '../Controller/SendMessage.php';
    return $response->withJson($payload, 200);
});

$app->post('/UploadFile', function (Request $request, Response $response, $args) {
    setHeaders($response);

    $payload = require '../Controller/UploadFile.php';
    return $response->withJson($payload, 200);
});

$app->post('/CreateUser', function (Request $request, Response $response, $args) {
    setHeaders($response);

    $payload = require '../Controller/CreateUser.php';
    return $response->withJson($payload, 200);
});

$app->post('/GetFilesMeet', function (Request $request, Response $response, $args) {
    setHeaders($response);

    $payload = require '../Controller/GetFilesMeet.php';
    return $response->withJson($payload, 200);
});

$app->run();
