import * as models from '../../database/models';
import { buildSchema } from 'graphql';
import { rootSchema } from '../resolvers/builder';
export const schema = buildSchema(`
${rootSchema}
${models.AppUserSchema}
${models.userVerificationSchema}
${models.userRefreshTokenSchema}
`);
