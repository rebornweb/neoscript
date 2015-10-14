<?php
error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
error_reporting(-1);

define('INCLUDE_CHECK',true);

require 'connect.php';
require 'functions.php';
// Those two files can be included only if INCLUDE_CHECK is defined

session_name('tzLogin');
// Starting the session

session_set_cookie_params(2*7*24*60*60);
// Making the cookie live for 2 weeks

session_start();




if($_SESSION['id'] && !isset($_COOKIE['tzRemember']) && !$_SESSION['rememberMe'])
{
	// If you are logged in, but you don't have the tzRemember cookie (browser restart)
	// and you have not checked the rememberMe checkbox:

	$_SESSION = array();
	session_destroy();
	
	// Destroy the session
}


if(isset($_GET['logoff']))
{
	$_SESSION = array();
	session_destroy();
	
	header("Location: index.php");
	exit;
}



if($_POST['submit']=='Login')
{
	


	// Checking whether the Login form has been submitted
	
	$err = array();
	// Will hold our errors
	
	
	if(!$_POST['username'] || !$_POST['loginPassword'])
		$err[] = 'All the fields must be filled in!';
	
	if(!count($err))
	{
		//Encrypt two way password here sort this out yummit 
$iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);
$iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
$key = "JehovahJireh";		
	
	$username = mysqli_real_escape_string($connection,$_POST['username']);
	$password = mysqli_real_escape_string($connection,$_POST['loginPassword']);
	  
$encryptPass = mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $key,$password, MCRYPT_MODE_ECB, $iv);
			
							// Escaping all input data
			$_POST['rememberMe'] = (int)$_POST['rememberMe'];
	
	
			//Decrypted Password
	
// Query database to check if there are any matching $_POST users & passwords
$sql= "SELECT id,usr,pass,hash FROM tz_members WHERE usr='".$username."' AND pass='".$encryptPass."'";
		$result=mysqli_query($connection,$sql);

		//If stuffs up put back before sql
	
		// Associative array
		$row=mysqli_fetch_assoc($result);
		$num_rows = mysql_num_rows($result);
		

		//$hashedPasswordFromDB = $row['hash'];
		
	//or use if($row['usr'])
		//if username and password matches as in result succeeds
	if($row['usr'])
		{
			// If everything is OK login
			
			$_SESSION['usr']=$row['usr'];
			$_SESSION['id'] = $row['id'];
			$_SESSION['rememberMe'] = $_POST['rememberMe'];
			
			// Store some data in the session
			
			setcookie('tzRemember',$_POST['rememberMe']);
			
			
			
		}else{   $err[]='Wrong username and/or password!';}
	}
	
	if($err)
	$_SESSION['msg']['login-err'] = implode('<br />',$err);
	// Save the error messages in the session

header("Location: index.php");
//or if homepage header("Location: index.php");
	exit;
}
else if($_POST['submit']=='Register')
{
	// If the Register form has been submitted
	
	$err = array();
	
	if(strlen($_POST['username'])<4 || strlen($_POST['username'])>32)
	{
		$err[]='Your username must be between 3 and 32 characters!';
	}
	
	if(preg_match('/[^a-z0-9\-\_\.]+/i',$_POST['username']))
	{
		$err[]='Your username contains invalid characters!';
	}
	
	if(!checkEmail($_POST['email']))
	{
		$err[]='Your email is not valid!';
	}
	
	if(!count($err))
	{
		// If there are no errors
		
		
		//This variable is important
		$pass = $_POST['newPassword'];
		
		
/**Hash is created
 * Note that the salt here is randomly generated.
 */
$options = [
	
	//Higher cost higher proccessing and hashing password 
    'cost' => 10,
    'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
];


//Generate Random password hash from password
$hash = password_hash($pass, PASSWORD_BCRYPT, $options);

		
		$email = mysqli_real_escape_string($connection,$_POST['email']);
		$user = mysqli_real_escape_string($connection,$_POST['username']);
		// Escape the input data
		
		

	//Encrypt two way password here sort this out yummit 
$iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);
$iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
$key = "JehovahJireh";
		
		
		
		mysqli_query($connection,"	INSERT INTO tz_members(usr,pass,hash,email,regIP,dt)
						VALUES(
						
							'".$user."',
							'".mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $key, $pass, MCRYPT_MODE_ECB, $iv)."',
							'".$hash."',
							'".$email."',
							'".$_SERVER['REMOTE_ADDR']."',
							NOW()
							
						)");
		
		if(mysqli_affected_rows($connection))
		{
			send_mail(	'demo-test@tutorialzine.com',
						$_POST['email'],
						'Registration System Demo - Your New Password',
						'Your password is: '.$pass);

			$_SESSION['msg']['reg-success']='We sent you an email with your new password!';
		
		
		
		
		}
		else $err[]='This username is already taken!';
	}

	if(count($err))
	{
		$_SESSION['msg']['reg-err'] = implode('<br />',$err);
	}	
	
	header("Location: index.php");
	exit;
}

$script = '';

if($_SESSION['msg'])
{


	// The script below shows the sliding panel on page load
	
	$script = '
	<script type="text/javascript">
	
		$(function(){
		
			$("div#panel").show();
			$("#toggle a").toggle();
		});
	
	</script>';
	
}
?>


<!DOCTYPE html>
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Socialmedia Project - Rebornweb.co.nz</title>
    
	
	
<?php include 'includes/globalhead.php'; ?>


    <?php echo $script; ?>
</head>

<body>


<!-- Panel -->


<?php include 'includes/navigation.php'; ?>



<section class="content">
	<article class="content">
	
	<h2>Socialmedia Project - Yeah Boy</h2>
            

    <!-- The tab on top -->	
	<div class="tab">
		<ul class="login">
	        <li>
				Hello
	<?php
	/*This will echo out the users login name and will echo out guest if
	   $_SESSION usr isnt set ternary smooth operator*/
	echo ($_SESSION['usr']) ?  $_SESSION['usr'] : 'Guest' ; ?>!</li>

		
	
		</ul> 
	</div> <!-- / top -->
            
            <?php
			
			if(!$_SESSION['id']){
			
			?>
            
			<div class="left">
		<!-- Login Form -->
		<form class="clearfix" action="" method="post">
					<h1>Member Login</h1>
                    
                    <?php
						
						if($_SESSION['msg']['login-err'])
						{
							echo '<div class="err">'.$_SESSION['msg']['login-err'].'</div>';
							unset($_SESSION['msg']['login-err']);
						}
					?>
					
			<label class="grey" for="username">Username:</label>
			<input class="field" type="text" name="username" id="username" value="" size="23" />
			<label class="grey" for="loginPassword">Password:</label>
			<input class="field" type="password" name="loginPassword" id="loginPassword" size="23" />
	        <label><input name="rememberMe" id="rememberMe" type="checkbox" checked="checked" value="1" /> &nbsp;Remember me</label>
        	<div class="clear"></div>
			<input type="submit" name="submit" value="Login" class="bt_login" />
		</form>
			</div>
	</article>
	<article class="regForm">
			<div class="left right">			
				<!-- Register Form -->
				<form action="" method="post">
					<h1>Not a member yet? Sign Up!</h1>		
                    
                    <?php
						
						if($_SESSION['msg']['reg-err'])
						{
							echo '<div class="err">'.$_SESSION['msg']['reg-err'].'</div>';
							unset($_SESSION['msg']['reg-err']);
						}
						
						if($_SESSION['msg']['reg-success'])
						{
							echo '<div class="success">'.$_SESSION['msg']['reg-success'].'</div>';
							unset($_SESSION['msg']['reg-success']);
						
						}
					?>
                    		
					<dt class="grey" for="username">Username:</label></dt>
					<dd><input class="field" type="text" name="username" id="username" value="" size="23" /></dd>
					<dt class="grey" for="email">Email:</label></dt>
					<dd><input class="field" type="text" name="email" id="email" size="23" /></dd>
					<dt>Enter Your New Password:</dt>
							<dd><input class="field" type="text" name="newPassword" id="newPassword" size="23" /></dd>
					<input type="submit" name="submit" value="Register" class="bt_register" />
				</form>
			</div>
            
            <?php
			
			}else{
			
			?>
            
            <div class="left">
            
            <h1>Members panel</h1>
            
            <p>You can put member-only data here</p>
            <a href="registered.php">View a special member page</a>
            <p>- or -</p>
            <a href="?logoff">Log off</a>
            
            </div>
            
            <div class="left right">
            </div>
            
            <?php
			}//endelse
			?>
		
	
	</article>
	 <!-- /login -->	


	
</section> <!--panel -->

<?php include 'includes/footer.php'; ?>
</body>
</html>
