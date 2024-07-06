import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const createAccessToken = async (firstName: string, lastName: string, email: string, uuid: string) => {
    dotenv.config();

    const data = {
        firstName,
        lastName,
        email,
        uuid,
    };

    const payload = {
        data,
        type: "access",
    };

    const JWT_SECRET = process.env.JWT_SECRET || "secret";
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1h",
    });
};

const refreshAccessToken = async (token: string) => {
    dotenv.config();

    const JWT_SECRET = process.env.JWT_SECRET || "secret";
    const decodedToken = jwt.verify(token, JWT_SECRET) as { [key: string]: any };

    const payload = {
        data: decodedToken.data,
        type: "access",
    };

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1h",
    });
}


const createRefreshToken = async (uuid: string) => {
    dotenv.config();

    const data = {
        uuid,
    };

    const JWT_SECRET = process.env.JWT_SECRET || "secret";
    const payload = {
        data,
        type: "refresh",
    };
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "2d",
    });
};

const validateToken = async (token: string) => {
    dotenv.config();

    const JWT_SECRET = process.env.JWT_SECRET || "secret";
    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch (error) {
        return false;
    }
};

const decodeToken = async (token: string) => {
    dotenv.config();

    const JWT_SECRET = process.env.JWT_SECRET || "secret";
    return jwt.verify(token, JWT_SECRET) as { [key: string]: any };
}


export { createRefreshToken, createAccessToken, validateToken, refreshAccessToken, decodeToken };
