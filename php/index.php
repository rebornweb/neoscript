<?php


$ch = curl_init();
$url = 'http://randomuser.me/api'; 


curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);


$response = curl_exec($ch);
//Check for errors.
if(curl_errno($ch)){
    throw new Exception(curl_error($ch));
}

curl_close($ch);
echo $response;


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple HTML Page</title>
</head>
<body>
    <!-- <header>
        <h1>Welcome to My Simple HTML Page</h1>
    </header>
    <nav>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </nav> -->
    <main>
        <section>
<?php if (isset($age)):?>
        <p>Age: <?= $age ?>
<?php endif;?>

            <form>
                <label for='name'> Name</label>
                <input name="name" id='name'/>
                <button>Push </button>
            </form>


        </section>
    </main>
    <footer>
        <p>&copy; 2023 Simple HTML Page. All rights reserved.</p>
    </footer>
</body>
</html>
