#!/bin/bash
set -euo pipefail

buildCommand="tsc --outDir ./dist --declaration true"
if getopts ":d" arg; then
  mode="development"
  buildCommand="$buildCommand --sourceMap true --watch true --noUnusedLocals false --allowUnreachableCode true"
else
  mode="production"
fi

echo "Build for $mode."

if [ -d "./dist" ]; then
  echo "Remove previous build."
  rm -rf ./dist
fi

echo "Build command: $buildCommand"
eval "$buildCommand"
