<?php

if(!defined('INCLUDE_CHECK')) die('You are not allowed to execute this file directly');

class socialMedia{

function checkEmail($str)
{
	return preg_match("/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/", $str);
}


function send_mail($from,$to,$subject,$body)
{
	$headers = '';
	$headers .= "From: $from\n";
	$headers .= "Reply-to: $from\n";
	$headers .= "Return-Path: $from\n";
	$headers .= "Message-ID: <" . md5(uniqid(time())) . "@" . $_SERVER['SERVER_NAME'] . ">\n";
	$headers .= "MIME-Version: 1.0\n";
	$headers .= "Date: " . date('r', time()) . "\n";

	mail($to,$subject,$body,$headers);
}

}//End Class

$func = new socialMedia();

    /*Public class
        if (is_a($me, 'Person')) {
          echo "I'm a person, ";
        }
        //Constructor
        if (property_exists($me, 'name')) {
          echo "I have a name, ";
        }
        //Public Function
        if (method_exists($me, 'dance')) {
          echo "and I know how to dance!";
                echo $me->dance();
        }*/
?>