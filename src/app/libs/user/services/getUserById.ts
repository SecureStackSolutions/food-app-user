import { AppUser, UserVerification } from '../../database/models';
import { UserNotFoundError } from './getUserByEmail';

export async function getUserById(
    data: {
        id: number;
    },
    includeUserVerification = false
): Promise<AppUser> {
    const user = await AppUser.findOne({
        where: { ...data },
        ...(includeUserVerification && { include: UserVerification }),
    });

    if (!user) {
        throw new UserNotFoundError();
    }
    return user;
}
