#!/bin/bash

source .env

if [ $TARGET = "library" ]; then
  DECLARATION=true
else
  DECLARATION=false
fi

echo ${NODE_ENV} ${DEBUG} ${target}

rm -r ./dist/*
tsc --outDir ./dist --sourceMap ${DEBUG} --watch ${WATCH} --declaration ${DECLARATION}
