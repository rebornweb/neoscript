<?php

if(!defined('INCLUDE_CHECK')) die('You are not allowed to execute this file directly');

// Database config 

$db_host		= 'localhost';
$db_user		= '###';
$db_pass		= '###';
$db_database	= '###'; 



$connection = mysqli_connect($db_host,$db_user,$db_pass,$db_database);

/* End config */

if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL; " . mysqli_connect_error();
  
  }



 //mysqli_query($connection,'CREATE TEMPORARY TABLE `table`') or die('Unable to establish a DB connection');

mysqli_select_db($connection,$db_database);
//mysql_query("SET names UTF8");
//mysqli_close($connection);

?>