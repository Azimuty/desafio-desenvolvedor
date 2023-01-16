#!/bin/bash
docker-compose down
docker build -t azimuty/desafio:php .
docker image prune -f
docker-compose up