import { Router } from 'express';
import { router } from './libs/user/user.routes';

const rootRouter = Router();

rootRouter.get('/', (req, res) => {
    res.send({ message: 'Super healthy' });
});

rootRouter.use('/', router);

rootRouter.use('*', (req, res) => {
    res.status(404).send({ type: 'ERROR', message: 'Route does not exist' });
});

export default rootRouter;
