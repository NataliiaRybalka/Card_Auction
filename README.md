
## General info
This project is a card auction.
	
## Technologies
Project is created with:
* React
* React-Router-Dom
* Redux
* Redux-saga
* Node
* Express
* Bookshelf
* Knex
	
## Setup
To run this project
1) Install node dependencies using npm:
```bash
$ cd server/
$ npm install
```
2) Running migrations for the database:
```bash
$ cd database/knex/
$ knex migrate:latest
$ knex seed:run
$ cd ../../
```
3) Start backend-part of the project: 
```bash
$ npm run dev
```
4) Install react dependencies using npm:
```bash
$ cd ../client/
$ npm install
```
4) Start frontend-part of the project: 
```bash
$ npm start
```