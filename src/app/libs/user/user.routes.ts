import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router.post('/loginUser', UserController.loginUser);
router.post('/updateUser', UserController.updateUser);
router.post(
    '/generateVerificationCode',
    UserController.generateVerificationCode
);
router.post('/verifyUser', UserController.verifyVerificationCode);

export { router };
