import { setUser } from './setUser.mutation';
import { updateVerificationByUserEmail } from './updateVerificationByEmail.mutation';

export const mutationResolvers = {
	setUser,
	updateVerificationByUserEmail,
};

export const mutationSchemas = `
type Mutation {
    setUser(name: String!, email: String!): ValidUntil
    updateVerificationByUserEmail(email: String!): ValidUntil
}`;
