import { AppUser } from '../../database/models';

export async function updateUserInfo(data: {
    userId: number;
    name: string;
}): Promise<AppUser> {
    const { name, userId } = data;
    await AppUser.update({ name }, { where: { id: userId } });
    return AppUser.findOne({ where: { id: userId } }) as Promise<AppUser>;
}
