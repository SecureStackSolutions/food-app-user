import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import rootRouter from './app/app.routes';
import { sequelize } from './app/libs/database';
import { AuthController } from '@lvdkleij/authentication-middleware';
import { config } from './config';
import { Kafka, Partitioners } from 'kafkajs';

const app = express();

const kafka = new Kafka({
	clientId: 'user',
	brokers: ['kafka:9092'],
});

export const kafkaProducer = kafka.producer({
	createPartitioner: Partitioners.DefaultPartitioner,
});

// Middelware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use('/', rootRouter);

// reduce fingerprinting
app.disable('x-powered-by');

export const authController = new AuthController(config.database, {
	refreshTokenPayloadSecret: process.env
		.REFRESH_TOKEN_PAYLOAD_SECRET as string,
});

const start = async (): Promise<void> => {
	try {
		await sequelize.sync();
		app.listen(process.env.PORT);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

void start();
