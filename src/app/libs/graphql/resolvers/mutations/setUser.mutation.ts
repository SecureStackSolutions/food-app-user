import { AppUser, UserVerification } from '../../../database/models';
import { getVerificationCode, getFutureDate } from '../helpers/helpers';
import { ValidUntil } from '../helpers/schemas';

export async function setUser(args: {
	name: string;
	email: string;
}): Promise<ValidUntil> {
	const newUser = new AppUser(
		{
			...args,
			verification: {
				code: getVerificationCode(),
				validUntil: getFutureDate({ seconds: 90 }),
			},
		},
		{ include: UserVerification }
	);

	let user: AppUser;
	await newUser
		.save()
		.then((_user) => (user = _user))
		.catch((err) => {
			if (err.name === 'SequelizeUniqueConstraintError') {
				throw Error('User already exists');
			}
		});

	return { validUntil: user!.verification.validUntil.getTime().toString() };
}
