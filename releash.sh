#!/usr/bin/env sh
set -e

VERSION=`./bin/select-version-cli`

echo "release $VERSION"

npm version $VERSION -m "[release] $VERSION"
npm publish
