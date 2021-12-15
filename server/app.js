import cors from 'cors';
import express from 'express';
import fileupload from 'express-fileupload';
import { Server } from 'socket.io';
import path from 'path';

import { PORT } from './constants/env.constants';
import { LOCALHOST } from './constants/project.constants';
import cronRun from './helpers/cron.helper';
import auctionRouter from './routes/auction.router';
import authRouter from './routes/auth.router';
import balanceRouter from './routes/balance.router';
import cardRouter from './routes/card.router';
import cardSetRouter from './routes/cardSet.router';
import chatRouter from './routes/chat.router';
import historyRouter from './routes/history.router';
import userRouter from './routes/user.router';
import chatRepository from './repositories/chat/chat.repository';

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
app.use('/chats', chatRouter);
app.use('/history', historyRouter);
app.use('/users', userRouter);

app.use((err, req, res, next) => {
    res.status(err.status).json(err.message);
});

const connection = app.listen(PORT, () => {
    console.log(`App listen ${ PORT }`);
    cronRun();
});

export const io = new Server(connection, {
    cors: {
        origin: LOCALHOST,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

const userStorage = [];
const roomStorage = [];

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on('connect_user', (data) => {
        userStorage.push({ userId: data, socketId: socket.id, notifications: [] });
    });

    socket.on('join_room', (data) => {
        socket.join(data);
        roomStorage.push({ socketId: socket.id, room: data });
        console.log(`User with id: ${socket.id} joined room: ${data}`);
    });

    socket.on('send_message', (data) => {
        chatRepository.createMessage(data.from, data.to, data.chatId, data.message);

        const user = userStorage.find(user => user.userId === data.to);
        const userInRoom = roomStorage.find(room => room.socketId === user.socketId);

        if (userInRoom) {
            socket.to(data.room).emit('receive_message', data);
        } else {
            io.to(user.socketId).emit('receive_notification_to_menu', data.from);
            io.to(user.socketId).emit('receive_notification_to_chat_list', { from: data.from, message: data.message} );
        }
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected ${socket.id}`);
    });
});