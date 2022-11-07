import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { resolvers } from './libs/graphql/resolvers/builder';
import { schema } from './libs/graphql/schemas/builder';

const rootRouter = Router();

rootRouter.get('/', (req, res) => {
	// console.log(req);
	res.send({ message: 'Super healthy' });
});

const createContext = (req: any, res: any) => ({
	request: req,
	response: res,
});

rootRouter.use(
	'/graphql',
	graphqlHTTP(async (request, response, _graphQLParams) => ({
		graphiql: process.env.ENVIRONMENT === 'dev',
		rootValue: resolvers,
		context: createContext(request, response),
		schema: schema,
	}))
);
export default rootRouter;
