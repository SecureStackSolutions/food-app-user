import { Router } from 'express';
import { router } from './libs/user/user.routes';

const rootRouter = Router();

rootRouter.get('/', (_req, res) => {
	res.send({ message: 'Super healthy' });
});

rootRouter.use(router);

export default rootRouter;
