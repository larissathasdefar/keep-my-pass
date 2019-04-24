

import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '../../../TypeDefinition';

import PassType from '../PassType';
import PassModel from '../PassModel';
import * as PassLoader from '../PassLoader';

export default mutationWithClientMutationId({
  name: 'PassChangePassword',
  inputFields: {
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'pass new password',
    },
  },
  mutateAndGetPayload: async ({ password, id }, { user }: GraphQLContext) => {
    if (!user) {
      return {
        error: 'User is not authenticated',
      };
    }

    let pass = await PassModel.findById(id);

    if (pass) {
      pass.password = password;
      await pass.save();

      return { error: null };
    } else {
      return { error: 'Invalid pass.' }
    }
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
