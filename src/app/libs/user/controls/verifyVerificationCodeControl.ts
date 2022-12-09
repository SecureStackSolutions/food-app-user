import { AppUser } from '../../database/models';
import { getUserByEmail } from '../services/getUserByEmail';

export async function verifyVerificationCodeControl(data: {
    email: string;
    verificationCode: string;
}): Promise<AppUser> {
    const user = await getUserByEmail({ email: data.email }, true);
    const codeDoesNotMatch =
        user.verification.code !== data.verificationCode.toString();

    if (codeDoesNotMatch) {
        throw Error('Invalid verification code');
    }

    const codeIsExpired =
        new Date(Date.now()) >= new Date(user.verification.validUntil);

    if (codeIsExpired) {
        throw Error('Expired verification code');
    }

    return user;
}
