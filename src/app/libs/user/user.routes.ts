// import { Router } from 'express';
// import { UserController } from './user-controller';
// import { AuthController } from '@lvdkleij/authentication-middleware';

// const router = Router();

// router.post(
// 	'/signUp',
// 	UserController.getExistingUser,
// 	UserController.signUp,
// 	UserController.generateValidationCode
// );
// router.post(
// 	'/login',
// 	UserController.getExistingUser,
// 	UserController.generateValidationCode
// );
// router.post(
// 	'/generateValidationCode',
// 	UserController.getExistingUser,
// 	UserController.generateValidationCode
// );
// router.post(
// 	'/validateCode',
// 	UserController.validateUser,
// 	AuthController.createTokens
// );
// router.get(
// 	'/isAuthenticated',
// 	AuthController.validateTokens,
// 	(req: any, res: any) => {
// 		res.status(200).send({ type: 'OK', message: 'user is authenticated' });
// 	}
// );

// export { router };
