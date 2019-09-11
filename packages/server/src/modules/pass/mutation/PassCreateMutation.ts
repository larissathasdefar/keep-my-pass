
import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import pubSub, { EVENTS } from '../../../pubSub';

import PassType from '../PassType';
import * as PassLoader from '../PassLoader';
import PassModel from '../PassModel';
import UserModel from '../../user/UserModel';

export default mutationWithClientMutationId({
  name: 'PassCreate',
  inputFields: {
    website: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    user: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ website, password }, { user }) => {
    let owner = await UserModel.findById(user);

    if (!owner) {
      return {
        error: 'User not valid.',
      };
    }

    let pass = new PassModel({
      website,
      user,
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
      resolve: (obj, args, context) => PassLoader.load(context, context.user.id),
    },
  },
});
