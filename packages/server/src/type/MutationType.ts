

import { GraphQLObjectType } from 'graphql';

import UserMutations from '../modules/user/mutation';
import PassMutations from '../modules/pass/mutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...PassMutations,
  }),
});
