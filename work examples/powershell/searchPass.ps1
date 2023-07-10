$filesSearched = 0
$currentPath = Get-Location
$searchP = 'Pass'

Get-ChildItem -Path "$currentPath" -Filter "*.ps1" -Recurse |
    ForEach-Object {
        $filePath = $_.FullName
        $matchingLines = Get-Content -Path $filePath | Select-String -Pattern "$searchP"

        if ($matchingLines) {
            Write-Host "Found match(es) in file: $filePath"
            $matchingLines
            Write-Host ("-" * 40)
        }

        $filesSearched++
    }

Write-Host "Total files searched: $filesSearched"


