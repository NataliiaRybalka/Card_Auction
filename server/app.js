import cors from 'cors';
import express from 'express';
import fileupload from 'express-fileupload';
import { Server } from 'socket.io';
import path from 'path';

import { PORT } from './constants/env.constants';
import cronRun from './helpers/cron.helper';
import auctionRouter from './routes/auction.router';
import authRouter from './routes/auth.router';
import balanceRouter from './routes/balance.router';
import cardRouter from './routes/card.router';
import cardSetRouter from './routes/cardSet.router';
import historyRouter from './routes/history.router';
import setRouter from './routes/set.router';
import userRouter from './routes/user.router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'static')));

app.use(fileupload({}));

app.use('/auctions', auctionRouter);
app.use('/auth', authRouter);
app.use('/balance', balanceRouter);
app.use('/cards', cardRouter);
app.use('/card-sets', cardSetRouter);
app.use('/history', historyRouter);
app.use('/sets', setRouter);
app.use('/users', userRouter);

app.use((err, req, res, next) => {
    res.status(err.status).json(err.message);
});

const connection = app.listen(PORT, () => {
    console.log(`App listen ${ PORT }`);
    cronRun();
});

export const io = new Server(connection);

io.on('connection', (socket) => {
    console.log('Made socket connection');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
