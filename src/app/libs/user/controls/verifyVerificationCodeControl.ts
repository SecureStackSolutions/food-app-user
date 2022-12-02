import { AppUser } from '../../database/models';
import { getUserByEmail } from '../services/getUserByEmail';

export async function verifyVerificationCodeControl(data: {
	email: string;
	verificationCode: string;
}): Promise<AppUser> {
	const user = await getUserByEmail({ email: data.email }, true);
	const codeMatches =
		user.verification.code === data.verificationCode.toString();

	if (!codeMatches) {
		throw Error('Invalid verification code');
	}

	const codeIsNotExpired =
		new Date(Date.now()) <= new Date(user.verification.validUntil);

	if (!codeIsNotExpired) {
		throw Error('Expired verification code');
	}

	if (!user.isVerified) {
		await AppUser.update({ isVerified: true }, { where: { id: user.id } });
	}

	return user;
}
