$filesSearched = 0
$currentPath = Get-Location
$searchC = 'Search files for code'

# Start the timer
$timer = [System.Diagnostics.Stopwatch]::StartNew()

Get-ChildItem -Path $currentPath -File -Recurse |
    ForEach-Object {
        $filePath = $_.FullName
        $matchingLines = Get-Content -Path $filePath | Select-String -Pattern "$searchC"

        if ($matchingLines) {
            Write-Host "Found match(es) in file: $filePath"
            $matchingLines
            Write-Host ("-" * 40)
        }

        $filesSearched++

        # Display the elapsed time while running
        $elapsed = $timer.Elapsed.ToString("hh\:mm\:ss")
        Write-Host "Elapsed time: $elapsed" -NoNewline
        Write-Host "`r" -NoNewline
    }

# Stop the timer and display the final results
$timer.Stop()
Write-Host "Total files searched: $filesSearched"
Write-Host "Elapsed time: $($timer.Elapsed)"
