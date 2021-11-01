import jwt from 'jsonwebtoken';
import { v1 } from 'uuid';

import { ACCESS_TOKEN_SECRET } from '#constants/env.constants';

const accessExpires = '1h';
const refreshExpires = (30 * 24 * 60 * 60);

export const generateTokenPair = user_id => {
    const accessToken = jwt.sign({ user_id }, ACCESS_TOKEN_SECRET, { expiresIn: accessExpires });
    const refreshToken = { user_id, refresh_token: v1(), expiresIn: refreshExpires };

    return {
        accessToken,
        refreshToken
    }
};

export const verifyToken = token => jwt.verify(token, ACCESS_TOKEN_SECRET);
