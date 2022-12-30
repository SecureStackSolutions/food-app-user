import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router.post('/sendAuthenticationCode', UserController.loginUser);
router.post('/updateUser', UserController.updateUser);
router.post(
    '/generateVerificationCode',
    UserController.generateVerificationCode
);
router.post('/verifyAuthenticationCode', UserController.verifyVerificationCode);

export { router };
