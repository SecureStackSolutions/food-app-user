import { AppUser, UserVerification } from '../../../database/models';

export async function getUserById(args: {
	id: number;
}): Promise<AppUser | null> {
	return await AppUser.findOne({
		include: UserVerification,
		where: {
			...args,
		},
	});
}
