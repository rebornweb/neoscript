<article>
	<?php
	//Profile Pic
	if($_POST['submit']=='Profile'){
			  
	  $err = array();
	
		
	  if(!count($err))
	{
		//No Errors
		
$user = $_SESSION['usr'];
$file = rand(1000,100000)."-".$_FILES['file']['name'];
    $file_loc = $_FILES['file']['tmp_name'];
 $file_size = $_FILES['file']['size'];
 $file_type = $_FILES['file']['type'];
 $folder="uploads/";
  move_uploaded_file($file_loc,$folder.$file);


$sqlprofile = "INSERT INTO profile (file,type,size,usr,dt)
VALUES ('{$file}', '{$file_type}','$file_size','{$user}',NOW())";

	
	
	if ($mysqli->query($sqlprofile) === TRUE) {
    echo 'Profile Picture Updated';



	
} else {
 
    echo 'Error: ' . $sqlprofile . '<br>' . $mysqli->error;


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
		


	$precomment = mysqli_real_escape_string($mysqli,$_POST['comment']);
   
    mysqli_real_escape_string($mysqli,$_POST['comment']);
    $likes = mysqli_real_escape_string($mysqli,$_POST['likes']);
	$dislikes =  mysqli_real_escape_string($mysqli,$_POST['dislikes']);
		
	$comment = strip_tags($precomment);
   
   $userCom = $_SESSION['usr'];
	$timestamp = mysqli_real_escape_string($mysqli,$_POST['timestamp']);           // March 10, 5:16 pm

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
 
 

if ($mysqli->query($sqlcom) === TRUE) {
    echo "Comment Updated";
} else {
 
    echo "Error: " . $sqlcom . "<br>" . $mysqli->error;


}


  
	

}


	
}//Comment Form finished	
	?>
	
	
	
</article>

<?php

	
		if(method_exists($func, 'commentsProfile')){

	
//This Echos out the commentsin Profile OOP
 echo $func->commentsProfile();


		}	
	
$image = addslashes(file_get_contents($_FILES['image']['tmp_name'])); 
	
$sqlProfile = "SELECT * FROM profile WHERE usr='{$userCom}' ORDER BY  ABS(DATEDIFF(NOW(), `dt`)) LIMIT 1 ";
	
$resultProfile = mysqli_query($mysqli, $sqlProfile);

$rowP = mysqli_fetch_assoc($resultProfile);
		

?>


    <!-- This is for Profile Picture-->
<form action="" method="post" name="Profile" enctype="multipart/form-data">
<input type="file" name="file" />
<button type="submit" Value="Profile" name="submit" >upload</button>
</form >



	<form name="commentForm" action="" method="post" onsubmit="return checkForm(this);">
			
			<label class="grey" for="comment">Comment:</label>
	        <textarea name="comment" class="comment" cols='20' rows='5'  value="Leave a Line" ></textarea>
        	<div class="clear"></div>
			<input name="timestamp" id="timestamp" type="text" value="<?php echo  date("F j,g:i a"); ?>" style='display:none'/>
			
			<input type="submit" name="submit" value="Comment" class="bt_login" />
		</form>
	
	
	

	 