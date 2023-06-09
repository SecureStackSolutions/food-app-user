import { AppUser } from '../../database/models';
import {
    getFutureDate,
    getVerificationCode,
    sendVerificationEmail,
} from '../helpers';
import { getUserByEmail } from '../services/getUserByEmail';
import { updateVerificationCodeByUserId } from '../services/updateVerificationCodeByUserId';

export async function generateVerificationCodeControl(data: {
    email: string;
    user?: AppUser;
}): Promise<Date> {
    const user = data.user ?? (await getUserByEmail(data));
    const validUntil = getFutureDate({ seconds: 90 });
    const code = getVerificationCode();
    await updateVerificationCodeByUserId(
        { ...user.dataValues },
        code,
        validUntil!
    );
    sendVerificationEmail(user.email, code.toString());
    return validUntil!;
}
