#!/bin/bash
# Preserve UTF-8 characters including emoji
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

# Check if exiftool is installed
if ! command -v exiftool &> /dev/null; then
    echo "Error: exiftool is not installed. Please install it first:"
    echo "brew install exiftool"
    exit 1
fi

# Loop through all m4a files in the current directory
for file in *.m4a; do
    # Skip if no m4a files found
    [ -e "$file" ] || continue
    
    # Get creation date from metadata in YYYYMMDDHHMMSS format
    creation_date=$(exiftool -CreateDate -d "%Y%m%d%H%M%S" "$file" | awk -F': ' '{print $2}')
    
    # If no creation date found, skip the file
    if [ -z "$creation_date" ]; then
        echo "Warning: No creation date found in metadata for $file"
        continue
    fi
    
    # Create new filename with date prefix
    new_name="${creation_date}_${file}"
    
    # Only replace spaces and problematic characters, preserve emoji and other UTF-8
    clean_name=$(echo "$new_name" | sed 's/[[:space:]]/-/g' | sed 's/[?*:<>|"]/-/g')
    
    # Rename the file if it's different from the current name
    if [ "$file" != "$clean_name" ]; then
        mv "$file" "$clean_name"
        echo "Renamed: $file → $clean_name"
    fi
done 