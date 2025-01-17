#! /bin/bash

for file in $(find ./dist -type f -name "*.svg"); do
    convert -quality 100 -background none -resize 256x256 $file ${file%.svg}.webp
done
