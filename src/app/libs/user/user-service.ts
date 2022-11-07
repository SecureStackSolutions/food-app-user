// import { pgClient } from '../database_';

// export class UserService {
// 	static async getUserByEmail(email: string): Promise<any> {
// 		return new Promise((resolve, reject) => {
// 			if (!email) {
// 				reject('cannot be empty');
// 			}
// 			pgClient.query(
// 				`SELECT * FROM app_user WHERE email=$1`,
// 				[email],
// 				(err, result) => {
// 					if (err) {
// 						return reject(err);
// 					}
// 					resolve(result.rows);
// 				}
// 			);
// 		});
// 	}

// 	// static async insertUser(email: string, name: string): Promise<any> {
// 	// 	return new Promise((resolve, reject) => {
// 	// 		if (!email || !name) {
// 	// 			reject('cannot be empty');
// 	// 		}
// 	// 		pgClient.query(
// 	// 			'INSERT INTO app_user(name, email) VALUES($1, $2) RETURNING *',
// 	// 			[name, email],
// 	// 			(err, result) => {
// 	// 				if (err) {
// 	// 					return reject(err);
// 	// 				}
// 	// 				resolve(result.rows[0]);
// 	// 			}
// 	// 		);
// 	// 	});
// 	// }

// 	// static async insertVerificationByUserId(userId: number): Promise<any> {
// 	// 	return new Promise((resolve, reject) => {
// 	// 		if (!userId) {
// 	// 			reject('cannot be empty');
// 	// 		}
// 	// 		pgClient.query(
// 	// 			'INSERT INTO user_verification(user_id, code, valid_until) VALUES($1, $2, $3) RETURNING *',
// 	// 			[
// 	// 				userId,
// 	// 				Math.floor(Math.random() * 9001) + 1000,
// 	// 				new Date(Date.now() + 60000),
// 	// 			],
// 	// 			(err, result) => {
// 	// 				if (err) {
// 	// 					return reject(err);
// 	// 				}
// 	// 				resolve(result.rows[0]);
// 	// 			}
// 	// 		);
// 	// 	});
// 	// }

// 	// static async updateVerificationByUserId(userId: number): Promise<any> {
// 	// 	return new Promise((resolve, reject) => {
// 	// 		if (!userId) {
// 	// 			reject('cannot be empty');
// 	// 		}
// 	// 		pgClient.query(
// 	// 			'UPDATE user_verification SET code=$1, valid_until=$2 WHERE user_id=$3 RETURNING *',
// 	// 			[
// 	// 				Math.floor(Math.random() * 9001) + 1000,
// 	// 				new Date(Date.now() + 60000),
// 	// 				userId,
// 	// 			],
// 	// 			(err, result) => {
// 	// 				if (err) {
// 	// 					return reject(err);
// 	// 				}
// 	// 				resolve(result.rows[0]);
// 	// 			}
// 	// 		);
// 	// 	});
// 	// }

// 	static async getVerificationByUserEmail(email: string): Promise<any> {
// 		return new Promise((resolve, reject) => {
// 			if (!email) {
// 				reject('cannot be empty');
// 			}
// 			pgClient.query(
// 				`SELECT * FROM user_verification d JOIN app_user t ON d.user_id = t.id WHERE t.email=$1`,
// 				[email],
// 				(err, result) => {
// 					if (err) {
// 						return reject(err);
// 					}
// 					resolve(result.rows);
// 				}
// 			);
// 		});
// 	}
// }
