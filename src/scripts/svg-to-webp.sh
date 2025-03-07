#! /bin/bash


for file in $(find ./dist -type f -name "*.svg"); do
    inkscape --export-type=png --export-width=256 --export-height=256 $file -o ${file%.svg}.png
    convert ${file%.svg}.png ${file%.svg}.webp
    rm ${file%.svg}.png
done

