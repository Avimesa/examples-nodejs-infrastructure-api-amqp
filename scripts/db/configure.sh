#!/bin/sh
#
# COPYRIGHT: This file and the source codes contained herein ("document") are
# the property of Avimesa, Inc.  Copyright 2016-2018, Avimesa, Inc.
#
# LICENSE:  Avimesa, Inc. grants the RECIPIENT a worldwide, royalty free,
# limited license to use the source codes in this document as specified
# in the Avimesa Open License:  http://avimesa.com/openlicense.txt
#

CWD=$PWD
POSTGRES_BIN=psql
POSTGRES_USER=postgres

which ${POSTGRES_BIN}

if [ $? == 0 ]
then
    echo "psql available!";
else
	echo "psql not found.  Exitting... ";
	exit;
fi

if [ $# == "3" ]
then
	USER="_"$1
	PASS=$2
	DB=${USER}
    echo "using user: " ${USER} " password: " ${PASS};

    cd ~postgres/

    if [ $3 == "create" ]
    then
        sudo psql -U postgres -a -f "$CWD/create.sql" -v v1="$USER" -v v2="'$PASS'"
        exit 0;
    fi
    if [ $3 == "delete" ]
    then
        echo "Are you sure you want to delete the database? (y/n): "
        read arg1
        if [ $arg1 == "y" ]
        then
            sudo psql -U postgres -a -f "$CWD/delete.sql" -v v1="$USER" -v v2="'$PASS'"
        fi
        exit 0;
    fi
    if [ $3 == "clear" ]
    then
        echo "Are you sure you want to clear the database? (y/n): "
        read arg1
        if [ $arg1 == "y" ]
        then
            sudo psql -U postgres -a -f "$CWD/clear.sql" -v v1="$USER" -v v2="'$PASS'"
        fi
        exit 0;
    fi
fi

echo "Invalid usage";
echo "  create.sh <group id> <password> <option>";
echo "  <option> - create, delete, clear";
exit -1;