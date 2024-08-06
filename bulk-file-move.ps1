# from inside starting folder
# recursively loop through a directory of directories to move files of a specific extension to another destination
Get-ChildItem -Path ".\*.jpg" -Recurse | Move-Item -Destination "C:\destination"
