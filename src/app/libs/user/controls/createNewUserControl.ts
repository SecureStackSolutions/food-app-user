import { AppUser } from '../../database/models';
import { sendVerificationEmail } from '../helpers';
import { saveNewUserService } from '../services/insertUserService';

export async function createNewUserControl(
	data: saveNewUserType
): Promise<AppUser> {
	const user = await saveNewUserService(data);
	sendVerificationEmail(user.email, user.verification.code);
	return user;
}

type saveNewUserType = { name: string; email: string };
