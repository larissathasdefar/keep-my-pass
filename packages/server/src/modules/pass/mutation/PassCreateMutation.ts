
import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLContext } from '../../../TypeDefinition';
import pubSub, { EVENTS } from '../../../pubSub';
import PassType from '../PassType';
import * as PassLoader from '../PassLoader';
import PassModel from '../PassModel';

export default mutationWithClientMutationId({
  name: 'PassCreate',
  inputFields: {
    website: {
      type: new GraphQLNonNull(GraphQLString),
    },
    login: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ website, login, password }, { user }: GraphQLContext) => {
    if (!user) {
      return {error: 'User not valid.'};
    }

    let pass = new PassModel({
      website,
      login,
      user: user.email,
      password,
    });

    await pass.save();

    await pubSub.publish(EVENTS.PASS.ADDED, { PassAdded: { pass } });

    return { pass };
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
    pass: {
      type: PassType,
      resolve: (obj, args, context) => PassLoader.load(context, obj.pass.id),
    },
  },
});
