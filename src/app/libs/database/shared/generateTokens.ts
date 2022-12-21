import axios from 'axios';
import { Response } from 'express';

export async function generateTokens(
    res: Response,
    name: string,
    email: string,
    id: number
) {
    const response = await axios.post(
        `http://application-gateway:8000/authenticate/createTokens`,
        { name, email, id },
        {
            headers: {
                'kong-key-auth': 'mykey',
            },
        }
    );

    const { accessToken, refreshToken } = response.data.results[0];

    res.cookie('refresh-token', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000 * 90,
    });

    res.cookie('refresh-token-empty', 'empty', {
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000 * 90,
    });

    res.setHeader('access-token', accessToken);
}
