import { AppUser, UserVerification } from '../../database/models';
import { getFutureDate, getVerificationCode } from '../helpers';

export async function saveNewUser(data: InsertUserType): Promise<AppUser> {
	const newUser = new AppUser(
		{
			...data,
			verification: {
				code: getVerificationCode(),
				validUntil: getFutureDate({ seconds: 90 }),
			},
		},
		{ include: UserVerification }
	);

	return newUser.save();
}

export type InsertUserType = { name: string; email: string };
