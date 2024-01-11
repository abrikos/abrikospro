#!/bin/bash
cd ~/abrikospro
GIT=`git pull`
if [[ $GIT =~ "Already" ]]; then
  echo $GIT
else
  ./reload.sh
fi
