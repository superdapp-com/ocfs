#! /bin/bash

for file in $(find ./dist -type f -name "*.svg"); do
    convert -quality 100 -background none -resize 256x256 $file ${file%.svg}.webp
done

# convert all webp to webp smaller 256 
for file in $(find ./dist -type f -name "*.webp"); do
    convert -quality 100 -background none -resize 256x256 $file ${file%.webp}.webp
done
