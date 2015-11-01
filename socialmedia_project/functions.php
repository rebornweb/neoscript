<?php


if(!defined('INCLUDE_CHECK')) die('You are not allowed to execute this file directly');

class socialMedia{


public function checkEmail($str)
{
	return preg_match("/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/", $str);
}


public function send_mail($from,$to,$subject,$body)
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


 
 public function commentsProfile(){
require 'connect.php';
$userCom = $_SESSION['usr'];
	$sqlquery= "SELECT usr,comment,time,likes,dislikes FROM comments
WHERE usr='{$userCom}' ORDER BY  ABS(DATEDIFF(NOW(), `time`))";




if ($result = mysqli_query($mysqli, $sqlquery)) {
	
while ($row = mysqli_fetch_assoc($result)) {
		$timestamp = $row["time"];
        echo ('User:'.$row['usr'].'<br><div class="comment">Said:'.$row["comment"].'</div><div class="timestamp">'.$timestamp.'</div><br>');
    
	}
	
	}else if ($mysqli->query($sqlquery) === TRUE) {
    echo "sql worked";
} else {
 
    echo "Error: " . $sqlquery . "<br>" . $mysqli->error;


}
	


 }//End commentProfile        

 
  public function commentsHome(){
require 'connect.php';
		
	$userCom = $_SESSION['usr'];

	  $query ="SELECT usr,comment,time,likes,dislikes FROM comments ORDER BY  ABS(DATEDIFF(NOW(), `time`))";

	// $mysqli = new mysqli();



if ($result = mysqli_query($mysqli, $query)) {
	
while ($row = mysqli_fetch_assoc($result)) {
		$timestamp = $row["time"];
        echo ('User:'.$row['usr'].'<br><div class="comment">Said:'.$row["comment"].'</div><div class="timestamp">'.$timestamp.'</div><br>');
    
	}
	
	}else if ($mysqli->query($query) === TRUE) {
    echo "sql worked";
} else {
 
    echo "Error: " . $query . "<br>" . $mysqli->error;


}
	


 }//End commentsHome
 
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