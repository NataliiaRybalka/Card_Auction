
## General info
This project is a card auction.
Project has next function:
1. Registration, login, login via Google and Facebook. Email confirmation via email. Password recovery.
2. Changing a personal info and addition a photo.
3. Creation of new hero cards by the admin.
4. Creation of sets of cards by the admin and assignment of bonuses to them.
5. Viewing all cards ans sets.  Viewing rating.
6. Putting up the created and purchased cards for auction.
7. Buying cards using bets.
8. All purchases are made through local currency. Balance replenishment through PayPal.
9. When user buy a card, he gets +1 point to his personal rating.
10. When user collected set, he gets bonuses indicated by the admin.
11. The ability to communicate with other users using chats.
12. Admin can designate other users as admins.
13. View purchased cards.
14. View sales history.
15. View balance history.
	
## Technologies
Project is created with:
* React
* React-Router-Dom
* Redux
* Redux-saga
* Node
* Express
* MySQL
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