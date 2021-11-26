import io from 'socket.io-client';

import { LOCALHOST } from "./contants";

export const socket = io(LOCALHOST, { transports : ['websocket'] });