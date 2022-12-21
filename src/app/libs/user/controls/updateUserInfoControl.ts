import { AppUser } from '../../database/models';
import { updateUserInfo } from '../services/updateUserInfo';

export async function updateUserInfoControl(
    data: saveNewUserType
): Promise<AppUser> {
    const user = await updateUserInfo(data);
    return user;
}

type saveNewUserType = { name: string; userId: number };
