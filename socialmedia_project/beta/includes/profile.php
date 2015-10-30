<article>
	<?php
	//Profile Pic
	if($_POST['submit']=='Profile'){
			  
	  $err = array();
	
		
	  if(!count($err))
	{
		//Error testing Started
		
$user = $_SESSION['usr'];
		
$image = addslashes(file_get_contents($_FILES['image']['tmp_name'])); //SQL Injection defence!
//$image = base64_encode($preimage);
$image_name = addslashes($_FILES['image']['name']);
$sqlprofile = "INSERT INTO profile (image,image_name,usr,dt)
VALUES ('{$image}', '{$image_name}','{$user}',NOW())";

	
	
	if ($connection->query($sqlprofile) === TRUE) {
    echo 'Profile Picture Updated';



	
} else {
 
    echo 'Error: ' . $sqlprofile . '<br>' . $connection->error;


}

	
	
	}//End Error testing
	
	
}//End Profile Pic	
	
	
	
	
	//Member comments
	
			//Leave a Comment
	if($_POST['submit']=='Comment')
     {
	  //Comment form is submitted
	  
	
	  
	  
	  $err = array();
	//Error Testing Started
	/*
	if(){
	
	$err[]='Your username contains invalid characters!';	
	}
	*/
	
	//Error testing finished
		
	  if(!count($err))
	{
		// If there are no errors
		


	$precomment = mysqli_real_escape_string($connection,$_POST['comment']);
   
    mysqli_real_escape_string($connection,$_POST['comment']);
    $likes = mysqli_real_escape_string($connection,$_POST['likes']);
	$dislikes =  mysqli_real_escape_string($connection,$_POST['dislikes']);
		
	$comment = strip_tags($precomment);
   
   $userCom = $_SESSION['usr'];
	$timestamp = mysqli_real_escape_string($connection,$_POST['timestamp']);           // March 10, 5:16 pm

	 $regIp =  $_SERVER['REMOTE_ADDR'];
	 
    $sqlcom = "	INSERT INTO comments(usr,comment,time,likes,dislikes,regIp)
						VALUES(
							'{$userCom}',
							'{$comment}',
							'{$timestamp}',
							'{$likes}',
							'{$dislikes}',
							'{$regIp}'
						
							
							
						)";
 
 

if ($connection->query($sqlcom) === TRUE) {
    echo "Comment Updated";
} else {
 
    echo "Error: " . $sqlcom . "<br>" . $connection->error;


}


  
	

}


	
}//Comment Form finished	
	?>
	
	
	
</article>

<?php
$userCom = $_SESSION['usr'];
$sqlquery= "SELECT usr,comment,time FROM comments WHERE usr='".$userCom."' ORDER BY  ABS(DATEDIFF(NOW(), `time`))";

	
		if ($result2 = mysqli_query($connection, $sqlquery)) {

    // fetch associative array 
    while ($row2 = mysqli_fetch_assoc($result2)) {
		$timestamp = $row2["time"];
        echo ('User:'.$row2['usr'].'<br><div class="comment">Said:'.$row2["comment"].'</div><br><div class="timestamp">'.$timestamp.'</div>');
    
	}
	
}
	
$image = addslashes(file_get_contents($_FILES['image']['tmp_name'])); 
	
$sqlProfile = "SELECT * FROM profile WHERE usr='{$userCom}' ORDER BY  ABS(DATEDIFF(NOW(), `dt`)) LIMIT 1 ";
	
$resultProfile = mysqli_query($connection, $sqlProfile);

$rowP = mysqli_fetch_assoc($resultProfile);
		
//echo $rowP['image'];
?>

    <!-- This is for Profile Picture-->
<form action="" method="POST" enctype="multipart/form-data">
    <label>File: </label><input type="file" name="image" />
    <input type="submit" value="Profile" name="submit" />
</form>

<?php
$bdecode = base64_encode( $rowP['image']);
// base64_decode($str);
echo '<img src="data:image/png;base64,'.base64_encode($rowP['image']).'">'; 

?>

	<form name="commentForm" action="" method="post" onsubmit="return checkForm(this);">
			
			<label class="grey" for="comment">Comment:</label>
	        <textarea name="comment" class="comment" cols='20' rows='5'  value="Leave a Line" ></textarea>
        	<div class="clear"></div>
			<input name="timestamp" id="timestamp" type="text" value="<?php echo  date("F j,g:i a"); ?>" style='display:none'/>
			
			<input type="submit" name="submit" value="Comment" class="bt_login" />
		</form>
	
	
	

	 