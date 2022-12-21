import jwtDecode from 'jwt-decode';
import CryptoJS from 'crypto-js';
import { config } from '../../../../config';

export function getUserFromCookies(cookies: string | undefined): {
    userId: number;
} {
    const refreshToken = getRefreshTokenFromCookies(cookies);

    const decodedPayload: any = jwtDecode(refreshToken!);
    const decryptedPayloaded = JSON.parse(
        CryptoJS.AES.decrypt(
            decodedPayload.encodedPayload,
            config.secrets.refreshTokenPayloadSecret
        ).toString(CryptoJS.enc.Utf8)
    );

    return decryptedPayloaded;
}

export function getRefreshTokenFromCookies(cookies: string | undefined) {
    if (cookies) {
        const cookiesArray = cookies.split(';');
        for (const cookie of cookiesArray) {
            const [key, value] = cookie.trim().split('=');
            if (key === 'refresh-token') {
                return value;
            }
        }
    }
    return null;
}
