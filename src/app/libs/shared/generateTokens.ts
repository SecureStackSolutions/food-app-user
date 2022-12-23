import axios from 'axios';
import { Response } from 'express';

export async function generateTokens(
    res: Response,
    name: string,
    email: string,
    id: number
) {
    const response = await axios.post(
        `http://application-gateway:8000/authenticate/createToken`,
        { name, email, id },
        { headers: { 'kong-key-auth': 'mykey' } }
    );
    const authenticationToken = response.headers['authentication-token'];

    res.setHeader('authentication-token', authenticationToken!);
}
