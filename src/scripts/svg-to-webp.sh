#! /bin/bash

# convert all webp to webp smaller 256
# for file in $(find ./dist -type f -name "*.webp"); do
#     convert -quality 100 -background none -resize 256x256 $file ${file%.webp}.webp
# done

for file in $(find ./dist -type f -name "*.svg"); do
    inkscape --export-type=png --export-width=256 --export-height=256 $file -o ${file%.svg}.png
    convert ${file%.svg}.png ${file%.svg}.webp
    rm ${file%.svg}.png
done

