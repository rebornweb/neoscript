<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
/**
 * Note that the salt here is randomly generated.
 */
$options = [
    'cost' => 11,
    'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
];

$pass = "rasmuslerdorf";
//Generate Random password hash from password
echo password_hash($pass, PASSWORD_BCRYPT, $options)."\n";

?>