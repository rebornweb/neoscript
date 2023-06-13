Function GetServiceData(
    [string]$opName = "AzureB2C",
    [string]$sTime = "",
    [string]$rootURI = "https://google.com",
    [string]$sFilterColumn = "",
    [string]$sFilterValue = "",
    [string]$username = "Andrei",
    [SecureString]$password
)
{
    $cred = New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $username, $password

    # Rest of your code here...
}
$credential = Get-Credential -UserName "username"
GetServiceData -username $credential.UserName -password $credential.Password
