<?php

define('INCLUDE_CHECK',true);

require 'connect.php';
require 'functions.php';
session_name('tzLogin');
session_set_cookie_params(2*7*24*60*60);
session_start();
error_reporting(E_ERROR | E_WARNING | E_PARSE);
error_reporting(E_ALL);


?>

<!DOCTYPE html >
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Socialmedia Project - Rebornweb.co.nz</title>
    
	
<?php include 'includes/globalhead.php'; ?>

    
</head>

<body>

<?php 'includes/navigation.php'; ?>

<section class='content'>

  

      <article class="content">
    <div class="container">
      <h1>Registered Users Only!</h1>
    <h2>Login to view this resource!</h2>
    <?php
	if($_SESSION['id']){
	//If Logged In 
	
	echo '<h1>Hello, '.'<span id="user">'.$_SESSION['usr'].'</span>'.'! You are registered and logged in!</h1>';
	
		//Leave a Comment
	if($_POST['submit']=='Comment')
     {
	  //Comment form is submitted
	  
	
	  
	  
	  $err = array();
	
		
	  if(!count($err))
	{
		// If there are no errors
		

	$precomment = mysqli_real_escape_string($connection,$_POST['comment']);
   
    mysqli_real_escape_string($connection,$_POST['comment']);
    $likes = mysqli_real_escape_string($connection,$_POST['likes']);
	$dislikes =  mysqli_real_escape_string($connection,$_POST['dislikes']);
		
	$comment = strip_tags($precomment);
   
	$timestamp = mysqli_real_escape_string($connection,$_POST['timestamp']);           // March 10, 5:16 pm

$sql = "	INSERT INTO comments(comment,time,likes,dislikes)
						VALUES(
						
							'".$comment."',
							'".$timestamp."',
							'".$likes."',
							'".$dislikes."'
						
							
							
						)";
  
if ($connection->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $connection->error;
}
  
  
	 }else{ $err[]='There is comment form error';}
	
	
	 }
	
	
	
	}else{ echo '<h1>Please, <a href="index.php">login</a> and come back later!</h1>';}
    

	
	
	?>
    <form action="" method="post">
			
			<label class="grey" for="comment">Comment:</label>
	        <label><input name="comment" id="comment" type="textarea" value="Leave a Line" />
        	<div class="clear"></div>
			<input name="timestamp" id="timestamp" type="text" value="<?php echo  date("F j,g:i a"); ?>" style='display:none'/>
			
			<input type="submit" name="submit" value="Comment" class="bt_login" />
		</form>
	
	
	  </article>
    

</section>

<?php include 'includes/footer.php'; ?>
</body>
</html>
