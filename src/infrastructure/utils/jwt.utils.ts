import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const createAccessToken = async (payload: object) => {
    dotenv.config();

    const JWT_SECRET = process.env.JWT_SECRET || 'secret';
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "15m",
    });
};

const refrshToken = async (token: string) => {
    dotenv.config();

    const JWT_SECRET = process.env.JWT_SECRET || 'secret';
    const decodedToken = jwt.verify(token, JWT_SECRET) as { [key: string]: any };
    return jwt.sign(decodedToken.foundUser, JWT_SECRET, {
        expiresIn: "2d",
    });
}


const createRefreshToken = async () => {
    dotenv.config();

    const JWT_SECRET = process.env.JWT_SECRET || 'secret';
    const payload = {
        type: 'refresh',
    };
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "2d",
    });
};

const validateToken = async (token: string) => {
    dotenv.config();

    const JWT_SECRET = process.env.JWT_SECRET || 'secret';
    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch (error) {
        return false;
    }
};

const decodeToken = async (token: string) => {
    dotenv.config();

    const JWT_SECRET = process.env.JWT_SECRET || 'secret';
    return jwt.verify(token, JWT_SECRET) as { [key: string]: any };
}


export { createRefreshToken, createAccessToken, validateToken, refrshToken, decodeToken };
