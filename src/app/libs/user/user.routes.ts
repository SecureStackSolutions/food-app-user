import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router.post('/signUp', UserController.signUpUser);
router.post(
	'/generateVerificationCode',
	UserController.generateVerificationCode
);
router.post('/verifyUser', UserController.verifyVerificationCode);

export { router };
