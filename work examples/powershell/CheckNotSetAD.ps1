Import-Module ActiveDirectory

$attribute = "extensionAttribute3"
$OU = "OU=Users,OU=Company,DC=Domain,DC=local"
$timer = [Diagnostics.Stopwatch]::StartNew()

#New Powershell
$users = Get-ADUser -Filter { -not (extensionAttribute3 -like '*') -or extensionAttribute3 -eq $null } -SearchBase $OU -Properties $attribute

#Old
#$users = Get-ADUser -Filter { -not (extensionAttribute3 -like '*')} -SearchBase $OU -Properties $attribute

$countWithValue = 0
$countWithoutValue = 0

if ($users) {
    $users | ForEach-Object {
        if ($null -eq $_.extensionAttribute3) {
            Write-Host "Found User $($_.SamAccountName) with no value for Attribute $attribute"
            $countWithoutValue++
        } else {
            Write-Host "Found User $($_.SamAccountName) with value $($user.extensionAttribute3) for Attribute $attribute"
            $countWithValue++
        }
    }
    Write-Host "Total number of users with value for Attribute $attribute: $countWithValue"
    Write-Host "Total number of users without value for Attribute $attribute: $countWithoutValue"
} else {
    Write-Host "No users found with null or empty value for Attribute $attribute"
}

Write-Host "Elapsed time: $($timer.Elapsed.TotalSeconds) seconds."
