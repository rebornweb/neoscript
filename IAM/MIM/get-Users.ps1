# Import the LithnetRMA module
Write-Host "Importing the LithnetRMA module..."
Import-Module LithnetRMA

# Define the output file name based on the current date and time
$OutputLogFileName = "C:\Users\z14809z\Desktop\" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".csv"
Write-Host "Output file name: $OutputLogFileName"

# Search for user objects in LithnetRMA
Write-Host "Searching for user objects..."
$users = Search-Resources -XPath "/Person" -AttributesToGet @("ObjectID","AccountName") -SortAttributes @("AccountName")
Write-Host "Found $($users.Count) user objects."

# Specify the properties you want to export to the CSV file
$properties = @("ObjectID","AccountName")

# Create an array to hold the data
$data = @()

# Loop through each user
Write-Host "Processing user data..."
foreach ($user in $users)
{
    # Create a hashtable to store user data
    $userData = @{}

    # Loop through each property and add it to the hashtable
    foreach ($property in $properties)
    {
        # Add the property to the hashtable with its corresponding value from the user object
        $userData.Add($property, $user.$property)
    }

    # Create a PSObject from the hashtable and add it to the data array
    $data += New-Object PSObject -Property $userData
}

# Export the data to a CSV file without type information
$data | Export-Csv -Path $OutputLogFileName -NoTypeInformation
Write-Host "Data exported to $OutputLogFileName"

# Display a completion message
Write-Host "Script completed."
