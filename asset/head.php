<?php

// Specify domains from which requests are allowed
header('Access-Control-Allow-Origin: mag.gmu.edu');

// Specify which request methods are allowed
header('Access-Control-Allow-Methods: HEAD');

// Additional headers which may be sent along with the CORS request
// The X-Requested-With header allows jQuery requests to go through
header('Access-Control-Allow-Headers: X-Requested-With');

// Set the age to 1 day to improve speed/caching.
//header('Access-Control-Max-Age: 86400');

if (!isset($_GET['url'])) die();
$url = urldecode($_GET['url']);
echo file_get_contents ($url);
$url = 'http://' . str_replace('http://', '', $url); // Avoid accessing the file system
$headers = get_headers($url);
foreach ($headers as $header => $value) {header($value);} 
