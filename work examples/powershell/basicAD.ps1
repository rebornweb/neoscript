
# Import the Active Directory module
Import-Module ActiveDirectory

# Get the first 10 users
Get-ADUser -Filter * -ResultSetSize 10
