#!/bin/sh

set -e
if [ -z "${PREFIX}" ]; then
  PREFIX="/usr/local"
fi

BIN_PATH="/usr/bin"


install_package "maven-3.1.0" "http://www.carfab.com/apachesoftware/maven/maven-3/3.1.0/binaries/apache-maven-3.1.0-bin.tar.gz"

install_package()
{
	echo $BIN_PATH
}
