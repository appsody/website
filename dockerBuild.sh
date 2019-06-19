#!/bin/bash

# For file permissions (using docker to create files):
# use --userId <id>    to set your user id
# use --groupId <id>   to set your group id

userId=$(id -u)
groupId=$(id -g)
args=()

ACTION=
LAUNCH_DIR=$(pwd)
SOURCE_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
cd ${SOURCE_DIR}

#-- Parse args
while [[ $# -gt 0 ]]; do
  case "$1" in
  "--userId")
    shift
    userId=$1
  ;;
  "--groupId")
    shift
    groupId=$1
  ;;
  shell|gulp)
    ACTION=$1
  ;;
  *)
    args+=($1)
  ;;
  esac
  shift
done

# Ensure volume exists for node modules (avoid putting in
# filesystem because of OS differences)
docker volume inspect appsody-web-node-modules &> /dev/null
rc=$?
if [ $rc -ne 0 ]
then
  docker volume create --name appsody-web-node-modules
fi

build_tools() {
  docker build \
    --build-arg userId=${userId}  \
    --build-arg groupId=${groupId} \
    -t appsody-web-build .
}

docker_run() {
  exec docker run --rm -it \
      --user="${userId}:${groupId}" \
      -v ${SOURCE_DIR}:/src \
      -v appsody-web-node-modules:/src/node_modules \
      appsody-web-build $@
}

## Ensure the tools/build image exists.
tools_image=$(docker images -q appsody-web-build 2>/dev/null)
if [ "$tools_image" == "" ]
then
  build_tools
fi

# make sure node_modules directory exsts (mount point)
mkdir -p node_modules

case "$ACTION" in
  tools)
    # Force rebuild of tools/build image, clear node modules for future changes
    build_tools
  ;;
  shell)
    docker_run /bin/bash
  ;;
  gulp)
    docker_run npx gulp ${args}
  ;;
  *)
    docker_run npm install
  ;;
esac
