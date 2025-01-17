#! /bin/bash

for file in $(find ./dist -type f -name "*.svg"); do
    echo "Converting $file to ${file%.svg}.webp"
    convert -quality 100 $file ${file%.svg}.webp
    # convert -quality 100 $file ${file%.svg}.webp
done
