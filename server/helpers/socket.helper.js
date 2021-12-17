import chatRepository from '#repositories/chat/chat.repository';

const userStorage = [];
let roomStorage = [];

export const ioFunc = (io) => io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on('connect_user', (data) => {
        let user = userStorage.find(user => user.userId === data);

        if (!user) {
            userStorage.push({ userId: data, socketId: socket.id, notifications: { rooms: [], count: 0, messages: [] } });
            user = userStorage.find(user => user.userId === data);
        } else {
            userStorage.map(user => {
                if (user.userId === data) {
                    user.socketId = socket.id;
                }
            });
        }

        io.to(socket.id).emit('receive_notification_to_menu_with_connect', user.notifications.count);
    });

    socket.on('went_to_chatlist_page', () => {
        let user = userStorage.find(user => user.socketId === socket.id);
        io.to(socket.id).emit('receive_notification_to_chatlist_with_connect', user.notifications.messages);
    });

    socket.on('join_room', (data) => {
        socket.join(data);
        roomStorage.push({ socketId: socket.id, room: data });
        userStorage.map(user => {
            if (user.socketId === socket.id) {
                user.notifications.rooms = user.notifications.rooms.filter(room => room !== data);
                user.notifications.count =  user.notifications.rooms.length;
                user.notifications.messages = user.notifications.messages.filter(msg => msg.room !== data);

                io.to(socket.id).emit('receive_notification_to_menu', user.notifications.count);
            }
        });
        console.log(`User with id: ${socket.id} joined room: ${data}`);
    });

    socket.on('send_message', (data) => {
        chatRepository.createMessage(data.from, data.to, data.chatId, data.message);

        const user = userStorage.find(user => user.userId === data.to);

        if (!user) {
            userStorage.push({ userId: data.to, notifications: { rooms: [data.room], count: 1, messages: [{ room: data.room, from: data.from, message: data.message }] } });
        } else {
            const userInRoom = roomStorage.find(room => room.socketId === user.socketId);

            if (userInRoom) {
                socket.to(data.room).emit('receive_message', data);
            } else {
                userStorage.map(user => {
                    if (user.userId === data.to) {
                        user.notifications.rooms.push(data.room);
                        user.notifications.count = user.notifications.rooms.length;
                        user.notifications.messages.push({ room: data.room, from: data.from, message: data.message });
                    }
                });
                io.to(user.socketId).emit('receive_notification_to_menu', user.notifications.count);
                io.to(user.socketId).emit('receive_notification_to_chatlist', { from: data.from, messages: data.message });
            }
        }
    });

    socket.on('leave_room', (data) => {
        socket.leave(data);
        roomStorage = roomStorage.filter(room => room.socketId !== socket.id);
        console.log(`User with id: ${socket.id} left room: ${data}`);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected ${socket.id}`);
    });
});