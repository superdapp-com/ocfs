#!/bin/sh

# remove all .DS_Store files in every directory
find . -name '.DS_Store' -type f -delete

# build dist folder
bun dist

# clone prod directory to r2
rclone copy dist/ r2ocfs:ocfs
