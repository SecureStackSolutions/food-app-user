import { Dialect } from 'sequelize';

const _config: any = {
	dev: {
		database: {
			username: 'postgres',
			password: 'postgres_password',
			database: 'postgres',
			host: 'postgres',
			port: 5432,
			dialect: 'postgres',
		},
	},
	prod: {
		database: {
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			dialect: process.env.DB_DIALECT as Dialect,
		},
	},
};

export const config = _config[process.env.ENVIRONMENT!];
