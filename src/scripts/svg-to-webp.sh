#! /bin/bash

for file in $(find ./dist -type f -name "*.svg"); do
    inkscape --export-type=png --export-width=256 --export-height=256 $file -o ${file%.svg}.png && convert ${file%.svg}.png ${file%.svg}.webp && rm ${file%.svg}.png
done

# convert all webp to webp smaller 256 
for file in $(find ./dist -type f -name "*.webp"); do
    inkscape --export-type=png --export-width=256 --export-height=256 $file -o ${file%.webp}.png  && convert ${file%.svg}.png ${file%.svg}.webp && rm ${file%.svg}.png
done
