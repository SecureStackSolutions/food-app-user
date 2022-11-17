import { UserVerification } from '../../database/models';

export async function updateVerificationCodeByUserId(
	data: { id: number },
	code: number,
	validUntil: Date
): Promise<[value: number]> {
	return UserVerification.update(
		{ code, validUntil },
		{ where: { userId: data.id } }
	);
}
