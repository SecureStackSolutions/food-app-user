import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router.post('/signUpUser', UserController.signUpUser);
router.post(
	'/generateVerificationCode',
	UserController.generateVerificationCode
);
router.post('/verifyVerificationCode', UserController.verifyVerificationCode);

export { router };
