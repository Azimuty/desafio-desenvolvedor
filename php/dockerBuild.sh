#!/bin/bash
docker build -t azimuty/desafio:php .
docker image prune -f
