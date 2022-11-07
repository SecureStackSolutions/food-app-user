import { getUserById } from './getUserById.query';
import { verifyUser } from './verifyUser.query';

export const queryResolvers = {
	getUserById,
	verifyUser,
};

export const querySchemas = `
type Query {
    getUserById(id: Int!): AppUser
    verifyUser(email: String!, verificationCode: String!): String
}`;
