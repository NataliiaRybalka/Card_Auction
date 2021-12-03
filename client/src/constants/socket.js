import io from 'socket.io-client';

import { LOCALHOST } from "./contants";

export const socket = io.connect(LOCALHOST, { transports : ['websocket'] });
