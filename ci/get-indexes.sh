# !/bin/sh
# Remove all development indexes
rm -rf src/data/indexes/*

# Download indexes that will be used on production (appsody.dev)
cd src/data/indexes
# Repeat the following command to add new indexes.
# Incubator
wget https://github.com/appsody/stacks/releases/download/java-microprofile-v0.2.4/incubator-index.yaml

cd ../../..