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
        throw new UserNotFoundError();
    }
    return user;
}

export class UserNotFoundError extends Error {
    constructor(message = 'User not found') {
        super(message);
        this.name = 'UserNotFoundError';
    }
}
