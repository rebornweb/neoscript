# Input the pwdLastSet value
$pwdLastSet = 133412782326442991

# Calculate the Unix timestamp (seconds since 1970-01-01)
$unixTimestamp = [math]::Round($pwdLastSet / 10000000 - 11644473600)

# Convert the Unix timestamp to a DateTime
$dateTime = [System.DateTime]::ParseExact($unixTimestamp.ToString(), "yyyy-MM-dd HH:mm:ss", $null)

# Print the result
$dateTime
