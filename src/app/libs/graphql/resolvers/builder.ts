import { queryResolvers, querySchemas } from './queries';
import { mutationResolvers, mutationSchemas } from './mutations';
import { helperSchemas } from './helpers/schemas';
export const resolvers = {
	...queryResolvers,
	...mutationResolvers,
};

export const rootSchema = `
${helperSchemas}
${querySchemas}
${mutationSchemas}
`;
