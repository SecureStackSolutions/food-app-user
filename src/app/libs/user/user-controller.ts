import { UserService } from './user-service';
import nodemailer from 'nodemailer';
import { Request, Response, NextFunction } from 'express';

export class UserController {
	// static async getExistingUser(req: any, res: any, next: any) {
	//     const newUser: User = { ...req.body }

	//     let existingUser: any;
	//     await UserService.getUserByEmail(newUser.email)
	//         .then(_existingUser => _existingUser.length ? existingUser = _existingUser[0] : null)
	//         .catch(x => console.log(x));

	//     req.user = existingUser;
	//     next();
	// }

	static async signUp(req: any, res: any, next: any) {
		const newUser: User = { ...req.body };
		const existingUser = req.user;

		if (existingUser) {
			res.status(400).send({
				type: 'ERROR',
				message: 'USER ALREADY EXISTS',
				description: 'User already exists in database',
				result: [],
			});
			return;
		}

		let createdUser: any;
		await UserService.insertUser(newUser.email, newUser.name)
			.then((_createdUser) => (createdUser = _createdUser))
			.catch((x) => console.log(x));
		if (!createdUser) {
			res.status(409).send({
				type: 'ERROR',
				message: 'COULD NOT CREATE USER VERIFICATION',
				description:
					'Something went wrong while trying to create user verification',
				result: [],
			});
			return;
		}
		let createdUserVerification: any;
		await UserService.insertVerificationByUserId(createdUser.id)
			.then(
				(_createdUserVerification) =>
					(createdUserVerification = _createdUserVerification)
			)
			.catch((x) => console.log(x));
		if (!createdUserVerification) {
			res.status(409).send({
				type: 'ERROR',
				message: 'COULD NOT CREATE USER VERIFICATION',
				description:
					'Something went wrong while trying to create user verification',
				result: [],
			});
			return;
		}

		req.user = createdUser;

		next();
	}

	static async generateValidationCode(req: any, res: any) {
		const user = req.user;

		if (!user) {
			res.status(400).send({
				type: 'ERROR',
				message: 'USER DOES NOT EXIST',
				description: 'User does not exist in database',
				result: [],
			});
			return;
		}

		let userVerification: any;
		await UserService.updateVerificationByUserId(user.id)
			.then((_userVerification) => (userVerification = _userVerification))
			.catch((x) => console.log(x));
		if (!userVerification) {
			res.status(409).send({
				type: 'ERROR',
				message: 'USER .......',
				description: 'User does exists in database',
				result: [],
			});
			return;
		}

		UserController.sendVerificationEmail(user.email, userVerification.code);

		res.status(200).send({
			results: [
				{ validation_code__valid_until: userVerification.valid_until },
			],
		});
	}

	static async validateUser(req: any, res: any, next: any) {
		const userEmail = req.body.email;
		const validationCodeAttempt = req.body.validationCode as number;

		let userVerification: any;
		await UserService.getVerificationByUserEmail(userEmail)
			.then((_userVerification) =>
				_userVerification.length
					? (userVerification = _userVerification[0])
					: null
			)
			.catch((x) => console.log(x));
		if (!userVerification) {
			res.status(400).send({
				type: 'ERROR',
				message: 'INVALID USER',
				description: 'User does not exists in database',
				result: [],
			});
			return;
		}

		if (
			userVerification.code == validationCodeAttempt &&
			Date.now() <= userVerification.valid_until.getTime()
		) {
			req.user = {
				name: userVerification.name,
				email: userVerification.email,
			};
			next();
		} else {
			res.status(400).send({
				type: 'ERROR',
				message: 'INVALID VALIDATION CODE',
				description: 'Wrong validation code',
				result: [],
			});
			return;
		}
	}

	static sendVerificationEmail(to: string, verificationCode: string) {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'testMailerLucas@gmail.com',
				pass: 'zjwjbwqkqqbyglis', // google account password'cZ8FvVg5YnJabWf'
			},
		});
		const mailOptions = {
			from: 'testMailerLucas@gmail.com',
			to,
			subject: 'Verify sign in',
			text: `Hello there, please insert the below verification code in the app ${verificationCode}`,
		};
		transporter.sendMail(mailOptions, (err, info) => {
			if (err) {
				console.log(err);
			}
			console.log(info);
		});
	}
}

interface User {
	email: string;
	name: string;
}
