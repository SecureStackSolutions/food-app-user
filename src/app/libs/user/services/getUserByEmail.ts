import { AppUser, UserVerification } from '../../database/models';

export async function getUserByEmail(
	data: {
		email: string;
	},
	includeUserVerification = false
): Promise<AppUser> {
	const user = await AppUser.findOne({
		where: { ...data },
		...(includeUserVerification && { include: UserVerification }),
	});

	if (!user) {
		throw Error('User not found');
	}
	return user;
}
