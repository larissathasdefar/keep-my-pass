

import { GraphQLString, GraphQLNonNull } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLContext } from '../../../TypeDefinition';
import PassType from '../PassType';
import PassModel from '../PassModel';
import * as PassLoader from '../PassLoader';

export default mutationWithClientMutationId({
  name: 'PassChangePassword',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'password global id',
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'pass new password',
    },
  },
  mutateAndGetPayload: async (context, { user }: GraphQLContext) => {
    const { password, id } = context;
    if (!user) {
      return {error: 'User is not authenticated'};
    }
    if (!id) {
      return {error: 'Id uninformed'};
    }

    const originalId = fromGlobalId(id).id;
    let pass = await PassModel.findById(originalId);
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
