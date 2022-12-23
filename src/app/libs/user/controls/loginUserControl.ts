import { AppUser } from '../../database/models';
import { getUserByEmail, UserNotFoundError } from '../services/getUserByEmail';
import { saveNewUser } from '../services/saveNewUser';
import { generateVerificationCodeControl } from './generateVerificationCodeControl';

export async function loginUserControl(
    data: saveNewUserType
): Promise<AppUser> {
    let user: AppUser;
    try {
        user = await getUserByEmail(data, true);
    } catch (err) {
        if (err instanceof UserNotFoundError) {
            user = await saveNewUser(data);
        } else {
            throw err;
        }
    }
    await generateVerificationCodeControl({ email: user.email, user });
    return user;
}

type saveNewUserType = { email: string };
