#!/bin/bash
cd /usr/src/app

knex migrate:latest

npm start
