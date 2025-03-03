#! /bin/bash

# Initialize GTK before using Inkscape to prevent GTK warnings
export XDG_RUNTIME_DIR="/tmp/runtime-root"
mkdir -p $XDG_RUNTIME_DIR

for file in $(find ./dist -type f -name "*.svg"); do
    inkscape --without-gui --batch-process --export-type=png --export-width=256 --export-height=256 $file -o ${file%.svg}.png
    convert ${file%.svg}.png ${file%.svg}.webp
    rm ${file%.svg}.png
done
