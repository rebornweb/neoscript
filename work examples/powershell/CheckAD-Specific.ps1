# Import the Active Directory module
Import-Module ActiveDirectory

$attribute = "mail"
$value = "test@gmail.com"
$OU = "OU=Users,OU=Company,DC=Domain,DC=local"
$timer = [Diagnostics.Stopwatch]::StartNew()

$users = Get-ADUser -Filter "$attribute -eq '$value'" -searchbase $OU -properties $attribute

if ($users) {
    $users | ForEach-Object {
        Write-Host "Found User $($_.SamAccountName) when searching Attribute $attribute"
    }
    Write-Host "Total number of users found: $($users.Count)"
} else {
    Write-Host "No users found with non-null value for Attribute $attribute"
}

Write-Host "Elapsed time: $($timer.Elapsed.TotalSeconds) seconds."
