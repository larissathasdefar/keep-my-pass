import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { connectionDefinitions } from '../../core/connection/CustomConnectionType';
import { registerType, nodeInterface } from '../../interface/NodeInterface';

const PassType = registerType(
  new GraphQLObjectType({
    name: 'Pass',
    description: 'Pass data',
    fields: () => ({
      id: globalIdField('Pass'),
      _id: {
        type: GraphQLString,
        resolve: pass => pass._id,
      },
      website: {
        type: GraphQLString,
        resolve: pass => pass.website,
      },
      password: {
        type: GraphQLString,
        resolve: pass => pass.password,
      },
      user: {
        type: GraphQLString,
        resolve: pass => pass.user,
      },
    }),
    interfaces: () => [nodeInterface],
  }),
);

export default PassType;

export const PassConnection = connectionDefinitions({
  name: 'Pass',
  nodeType: GraphQLNonNull(PassType),
});
