import { Request, Response } from 'express';
import {
	getFutureDate,
	getVerificationCode,
	sendVerificationEmail,
} from './helpers';
import { AppUser, UserVerification } from '../database/models';
import { authController } from '../../../server';

interface CustomRequest<T> extends Request {
	body: T;
}

export class UserController {
	static async signUpUser(
		req: CustomRequest<{ name: string; email: string }>,
		res: Response
	) {
		try {
			const body = req.body;

			if (!body.name || !body.email) {
				res.status(400).send({
					type: 'ERROR',
					message: 'Please provide a name and an email',
				});
			}

			const newUser = new AppUser(
				{
					...body,
					verification: {
						code: getVerificationCode(),
						validUntil: getFutureDate({ seconds: 90 }),
					},
				},
				{ include: UserVerification }
			);

			const user: AppUser = await newUser.save();

			sendVerificationEmail(user!.email, user!.verification.code);

			return res.status(200).send({
				type: 'SUCCESS',
				results: [
					{
						validUntil: user!.verification.validUntil,
					},
				],
			});
		} catch (e) {
			if (e instanceof Error) {
				if (e.name === 'SequelizeUniqueConstraintError') {
					return res.status(400).send({
						type: 'ERROR',
						message: 'User already exists',
					});
				}
			}

			return res.status(400).send({
				type: 'ERROR',
				message: 'Something went wrong trying to insert the user',
			});
		}
	}

	static async generateVerificationCode(
		req: CustomRequest<{ email: string }>,
		res: Response
	) {
		try {
			const body = req.body;
			if (!body.email) {
				res.status(400).send({
					type: 'ERROR',
					message: 'Must provide an email',
				});
			}
			const user = await AppUser.findOne({
				where: { email: body.email },
			});
			if (!user) {
				res.status(400).send({
					type: 'ERROR',
					message: 'User does not exist error',
				});
			}

			const validUntil = getFutureDate({ seconds: 90 });
			const code = getVerificationCode();
			await UserVerification.update(
				{ code, validUntil },
				{ where: { userId: user!.id } }
			);

			sendVerificationEmail(user!.email, code.toString());

			return res.status(200).send({
				type: 'SUCCESS',
				results: [{ validUntil }],
			});
		} catch (e) {
			if (e instanceof Error) {
			}
			return res.status(400).send({
				type: 'ERROR',
				message: 'Something went wrong',
			});
		}
	}

	static async verifyVerificationCode(
		req: CustomRequest<{ email: string; verificationCode: string }>,
		res: Response
	) {
		try {
			const body = req.body;
			if (!body.email || !body.verificationCode) {
				return res.status(400).send({
					type: 'ERROR',
					message: 'Must provide email and verification code',
				});
			}
			const user = await AppUser.findOne({
				include: UserVerification,
				where: { email: body.email },
			});

			if (!user) {
				return res.status(400).send({
					type: 'ERROR',
					message: 'User not found',
				});
			}

			const codeMatches =
				user.verification.code === body.verificationCode.toString();
			if (!codeMatches) {
				return res.status(400).send({
					type: 'ERROR',
					message: 'Verification code does not match',
				});
			}

			if (!user.isVerified) {
				await AppUser.update(
					{ isVerified: true },
					{ where: { id: user.id } }
				);
			}

			const codeIsNotExpired =
				new Date(Date.now()) <= new Date(user.verification.validUntil);
			if (!codeIsNotExpired) {
				return res.status(400).send({
					type: 'ERROR',
					message: 'Verification code has expired',
				});
			}

			await authController.createTokens(
				{
					email: user.email,
					name: user.name,
					userId: user.id.toString(),
				},
				res
			);

			return res
				.status(200)
				.send({ type: 'SUCCESS', message: 'User logged in' });
		} catch (e) {
			if (e instanceof Error) {
			}
			return res.status(400).send({
				type: 'ERROR',
				message: 'Something went wrong',
			});
		}
	}
}
