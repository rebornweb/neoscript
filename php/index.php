<?php


$ch = curl_init();
$url = 'https://randomuser.me/api'; 
$headers = [
    'Content-Type: application/x-www-form-urlencoded' // or 'application/json'

];


curl_setopt_array($ch, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true
    // CURLOPT_HTTPHEADER => $headers,
    // CURLOPT_HEADER => true
));


$response = curl_exec($ch);
//Check for errors.
if(curl_errno($ch)){
    throw new Exception(curl_error($ch));
}

//Get HTTP status code.
$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$content_type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
$content_length = curl_getinfo($ch, CURLINFO_CONTENT_LENGTH_DOWNLOAD);

curl_close($ch);
// Process the response
if ($response) {
    $responseData = json_decode($response, true); // Convert JSON response to an array or object
    echo $status_code, "\n"; 
    // echo $content_type, "\n";
    // echo $content_length, "\n";
    print_r($responseData); // Display the response data
} else {
    echo 'No response from the API';
}
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