Function GetServiceData(
    [string]$opName = "AzureB2C",
    [string]$sTime = "",
    [string]$rootURI = "https://google.com",
    [string]$sFilterColumn = "",
    [string]$sFilterValue = "",
    [string]$username = "",
    [SecureString]$password
) {
    # Function body goes here

    # Example code to demonstrate function usage
    Write-Host "Operation Name: $opName"
    Write-Host "Start Time: $sTime"
    Write-Host "Root URI: $rootURI"
    Write-Host "Filter Column: $sFilterColumn"
    Write-Host "Filter Value: $sFilterValue"
    Write-Host "Username: $username"
    Write-Host "Password: $password"
}

# Call the GetServiceData function with default arguments, a secure password, and a username
$securePassword = Read-Host -AsSecureString "Enter your password"
$username = Read-Host "Enter your username"
GetServiceData -password $securePassword -username $username

$usePassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword))

# Now you can use the $plainPassword variable as a regular string password
Write-Host "Plain Password: $usePassword"
