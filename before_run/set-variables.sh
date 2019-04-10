#!/bin/bash
# make it with . operator like ". ./set-variables.sh"

export NODE_ENV="development"
echo $NODE_ENV
export serv_jwt="yourSecureJwtToken"
echo serv_jwt