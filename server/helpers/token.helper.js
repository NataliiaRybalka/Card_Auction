import jwt from 'jsonwebtoken';
import { v1 } from 'uuid';

import { ACCESS_TOKEN_SECRET } from '#constants/env.constants';
import { ACCESS_EXPIRES, REFRESH_EXPIRES } from '#constants/tokens.constants';

export const generateTokenPair = user_id => {
    const accessToken = jwt.sign({ user_id }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_EXPIRES });
    const refreshToken = { user_id, refresh_token: v1(), expiresIn: REFRESH_EXPIRES };

    return {
        accessToken,
        refreshToken
    }
};

export const verifyToken = token => jwt.verify(token, ACCESS_TOKEN_SECRET);
