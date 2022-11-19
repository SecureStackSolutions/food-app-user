import { Sequelize } from 'sequelize-typescript';
import { config } from '../../../config';

const sequelize = new Sequelize({
	...config.database,
	logging: console.log,
	models: [__dirname + `/models/*.model.@(js|ts)`],
	modelMatch: (filename: string, member: string) => {
		return (
			filename.substring(0, filename.indexOf('.model')).toLowerCase() ===
			member.toLowerCase()
		);
	},
});

export { sequelize };
