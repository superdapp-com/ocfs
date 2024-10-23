#!/bin/sh

# remove all .DS_Store files in every directory
find . -name '.DS_Store' -type f -delete


bun dist

# clone prod directory to r2
# rclone copy prod/ ofcs:ocfs
