import { AppUser, UserVerification } from '../../../database/models';
import { getVerificationCode, getFutureDate } from '../helpers/helpers';
import { ValidUntil } from '../helpers/schemas';

export async function updateVerificationByUserEmail(args: {
	email: string;
}): Promise<ValidUntil> {
	const user = await AppUser.findOne({
		where: {
			...args,
		},
	});
	if (!user) {
		throw Error('User does not exist');
	}

	const validUntil = getFutureDate({ seconds: 90 });
	await UserVerification.update(
		{
			code: getVerificationCode(),
			validUntil,
		},
		{ where: { userId: user.id } }
	);

	return { validUntil: validUntil!.getTime().toString() };
}

//https://github.com/graphql/express-graphql/issues/439
