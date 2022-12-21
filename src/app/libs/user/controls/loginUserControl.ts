import { AppUser } from '../../database/models';
import { sendVerificationEmail } from '../helpers';
import { getUserByEmail, UserNotFoundError } from '../services/getUserByEmail';
import { saveNewUser } from '../services/saveNewUser';

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
    sendVerificationEmail(user.email, user.verification.code);
    return user;
}

type saveNewUserType = { email: string };
