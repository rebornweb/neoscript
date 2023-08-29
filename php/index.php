<?php


$ch = curl_init();
$url = 'https://api.unsplash.com/photos/random'; 
$headers = [
    'Authorization: Client-ID EA2pUhYKvWZTFAUzCf9AKWFwn_Rq4J3AHA12hoqqCoA',

];


$response_headers = [];

$header_callback = function($ch, $header) use (&$response_headers) {

    $len = strlen($header);

    $response_headers[] = $header;

    return $len;

};

curl_setopt_array($ch, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_HEADERFUNCTION => $header_callback
));


$response = curl_exec($ch);
//Check for errors.
if(curl_errno($ch)){
    throw new Exception(curl_error($ch));
}

//Get HTTP status code.
$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

print_r($response_headers);

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
