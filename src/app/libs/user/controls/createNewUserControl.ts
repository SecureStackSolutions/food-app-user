import { AppUser } from '../../database/models';
import { sendVerificationEmail } from '../helpers';
import { saveNewUser } from '../services/saveNewUser';

export async function createNewUserControl(
	data: saveNewUserType
): Promise<AppUser> {
	const user = await saveNewUser(data);
	sendVerificationEmail(user.email, user.verification.code);
	return user;
}

type saveNewUserType = { name: string; email: string };
