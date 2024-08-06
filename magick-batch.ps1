# Get a list of all the subdirectories
$subdirectories = Get-ChildItem -Directory

# Loop through each subdirectory
foreach ($subdirectory in $subdirectories) {
    # Change to the subdirectory
    Push-Location $subdirectory.FullName

    # Get a list of all the TIF files in the subdirectory
    $tifFiles = Get-ChildItem -Filter "*.tif"

    # Loop through each TIF file
    foreach ($tifFile in $tifFiles) {
        # Convert the TIF file to JPG using ImageMagick
        & magick $tifFile.FullName -resize 20% $(Join-Path $(Split-Path $tifFile.FullName) ($tifFile.BaseName + ".jpg"))
    }

    # Return to the original directory
    Pop-Location
}
