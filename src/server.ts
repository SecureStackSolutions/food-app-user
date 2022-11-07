import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import rootRouter from './app/app.routes';
import { sequelize } from './app/libs/database';
import { AuthController } from '@lvdkleij/authentication-middleware';
import { config } from './config';

const app = express();

// Middelware
if (process.env.ENVIRONMENT !== 'dev') {
	app.use(helmet());
}
app.use(cors());
app.use(bodyParser.json());
app.use('/', rootRouter);

// reduce fingerprinting
app.disable('x-powered-by');

export const authController = new AuthController(config.database);

const start = async (): Promise<void> => {
	try {
		await sequelize.sync();
		// https://itnext.io/a-boilerplate-for-graphql-sequilize-postgresql-on-node-4eb68c9596bc
		app.listen(process.env.PORT);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

void start();
