# !/bin/sh
# Remove all development indexes
rm -rf src/data/indexes/*

# Download indexes that will be used on production (appsody.dev)
cd src/data/indexes
# Repeat the following command to add new indexes.
# Stable
wget https://github.com/appsody/stacks/releases/latest/download/stable-index.yaml
# Incubator
wget https://github.com/appsody/stacks/releases/latest/download/incubator-index.yaml
# Experimental
wget https://github.com/appsody/stacks/releases/latest/download/experimental-index.yaml

cd ../../..