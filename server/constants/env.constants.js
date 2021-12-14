import { config } from 'dotenv';
config();

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_EMAIL_PASSWORD = process.env.ADMIN_EMAIL_PASSWORD;
export const LINK_FOR_CONFIRM_EMAIL = process.env.LINK_FOR_CONFIRM_EMAIL;
export const PORT = process.env.PORT;
export const PORT_CLIENT = process.env.PORT_CLIENT;
