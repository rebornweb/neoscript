Function GetServiceData(
    [string]$opName = "AzureB2C",
    [string]$sTime = "",
    [string]$rootURI = "https://google.com",
    [string]$sFilterColumn = "",
    [string]$sFilterValue = "",
    [string]$username = "",
    [string]$password
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
$username = Read-Host "Enter your username"
$securePassword = Read-Host -AsSecureString "Enter your password"
$usePassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword))
GetServiceData -password $usePassword -username $username


# Now you can use the $plainPassword variable as a regular string password
#Write-Host "Plain Password: $usePassword"
