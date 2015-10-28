<?php
/*Restart Password Page*/
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
<title>Socialmedia Project - Rebornweb.co.nz - Password Restart Page</title>
    
	
<?php include 'includes/globalhead.php'; ?>

    
</head>

<body>
<!-- Panel -->


<?php include 'includes/navigation.php'; ?>

<section class='content'>

  

      <article class="content">
    <div class="container">
      <h1>Registered Users Only!</h1>
    <h2> Password Restart Page</h2>
    <?php
	if($_SESSION['id']){
	//If Logged In 
	
	echo '<h1>Hello, '.'<span id="user">'.$_SESSION['usr'].'</span>'.'! You are registered and logged in!</h1>';
	
		//Leave a Comment
	if($_POST['submit']=='Restart')
     {
	  //Comment form is submitted
	  
	
	  
	  
	  $err = array();
	
		
	  if(!count($err))
	{
		//Error testing Started
		

      
$email = mysqli_real_escape_string($connection,$_POST['email']);
	
	
	
$query = "SELECT * FROM tz_members WHERE email='".$email."'";
   
   

 

	if ($result = mysqli_query($connection, $query)) {

    /* Decrypt Password*/
    while ($row = mysqli_fetch_assoc($result)) {
	  $pass_decrypt = mcrypt_decrypt(MCRYPT_RIJNDAEL_256,$key,$row["pass"], MCRYPT_MODE_ECB, $iv);
       echo ('Email:'.$row['email'].'<br><div>Password:'.$pass_decrypt.'</div><br>');
    
	}
	
	}
 
  
  
	  //Error testing Finished
	 }else{ $err[]='There is comment form error';}
	
	
	 
	 
	 
	 
	 
	 //End Comment Form Submitted
	 }else {echo "Logged in";} 
	
	
	
	
	
	
	
	//End Login Form Submitted otherwise Register and Login
	}else{ echo '<h1>Please, <a href="index.php">login</a> and come back later!</h1>';}
    


	

	
	
	?>
	
	<?php
//$query = "SELECT comment,time,likes,dislikes FROM comments ORDER by ID DESC LIMIT 50,5";
	
  
  $query ="SELECT usr,comment,time,likes,dislikes FROM comments";
	if ($result = mysqli_query($connection, $query)) {

    /* fetch associative array */
    while ($row = mysqli_fetch_assoc($result)) {
       echo ('User:'.$row['usr'].'<br><div class="comment">Said:'.$row["comment"].'</div><br>');
    
	}
	
	}
?>
	
    <form action="" method="post">
			
			<label class="grey" for="Email">Email:</label>
	       
			
			<input type="text" name="email" value="email" />
			<input type="submit" name="submit" value="Restart" />
		</form>
	
	
	  </article>
    

</section>

<?php include 'includes/footer.php'; ?>
</body>
</html>
