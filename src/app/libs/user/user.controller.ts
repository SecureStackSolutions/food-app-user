import { Request, Response } from 'express';
import { authController } from '../../../server';
import { createNewUserControl } from './controls/createNewUserControl';
import { generateVerificationCodeControl } from './controls/generateVerificationCodeControl';
import { verifyVerificationCodeControl } from './controls/verifyVerificationCodeControl';

interface CustomRequest<T> extends Request {
	body: T;
}

export class UserController {
	static async signUpUser(
		req: CustomRequest<{ name: string; email: string }>,
		res: Response
	) {
		try {
			const user = await createNewUserControl(req.body);
			return res.status(200).send({
				type: 'SUCCESS',
				results: [{ validUntil: user.verification.validUntil }],
			});
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).send({
					type: 'ERROR',
					message: err.message,
				});
			}

			return res.status(400).send({
				type: 'ERROR',
				message: 'Something went wrong',
			});
		}
	}

	static async generateVerificationCode(
		req: CustomRequest<{ email: string }>,
		res: Response
	) {
		try {
			const validUntil = await generateVerificationCodeControl(req.body);
			return res.status(200).send({
				type: 'SUCCESS',
				results: [{ validUntil }],
			});
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).send({
					type: 'ERROR',
					message: err.message,
				});
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
			const { email, name, id } = await verifyVerificationCodeControl(
				req.body
			);
			console.log(email, name, id);
			await authController.createTokens(
				{ email, name, userId: id.toString() },
				res
			);

			return res
				.status(200)
				.send({ type: 'SUCCESS', message: 'User logged in' });
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).send({
					type: 'ERROR',
					message: err.message,
				});
			} else {
				return res.status(400).send({
					type: 'ERROR',
					message: 'An unknown error happened',
				});
			}
		}
	}
}
