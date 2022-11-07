import { AppUser, UserVerification } from '../../../database/models';

export async function verifyUser(
	args: {
		email: string;
		verificationCode: string;
	},
	context: { response: any; request: any }
): Promise<string> {
	console.log(args);
	const user = await AppUser.findOne({
		include: UserVerification,
		where: {
			email: args.email,
		},
	});
	if (!user) {
		throw Error('User not found');
	}

	const codeMatches = user.verification.code === args.verificationCode;
	if (!codeMatches) {
		throw Error('Verification code does not match');
	}

	const codeIsNotExpired =
		new Date(Date.now()) <= new Date(user.verification.validUntil);
	if (!codeIsNotExpired) {
		throw Error('Verification code has expired');
	}

	context.response.cookie(
		'THIS_IS_NOT_THE_REFRESH_TOKEN_YOU_ARE_LOOKING_FOR',
		AuthController.generateRefreshToken(user),
		{
			httpOnly: true,
			sameSite: 'None',
			secure: true,
			maxAge: 24 * 60 * 60 * 1000 * 90,
		}
	);

	const accessToken = AuthController.generateAccessToken(user);

	return 'Authenticated';
}
