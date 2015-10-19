<?php

if(!defined('INCLUDE_CHECK')) die('You are not allowed to execute this file directly');

// Database config 

$db_host		= 'localhost';
$db_user		= 'mysqluser';
$db_pass		= '#####';
$db_database	= '#####'; 


		//Encrypt two way password here sort this out yummit 
$iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);
$iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
$key = "ASECRETKEY";		
	


$connection = mysqli_connect($db_host,$db_user,$db_pass,$db_database);

/* End config */

if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL; " . mysqli_connect_error();
  
  }



;

mysqli_select_db($connection,$db_database);

?>