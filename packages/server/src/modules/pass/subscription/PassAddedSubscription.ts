import { GraphQLObjectType } from 'graphql';
import { offsetToCursor } from 'graphql-relay';

import { PassConnection } from '../PassType';
import pubSub, { EVENTS } from '../../../pubSub';

const PassAddedPayloadType = new GraphQLObjectType({
  name: 'PassAddedPayload',
  fields: () => ({
    passEdge: {
      type: PassConnection.edgeType,
      resolve: ({ pass }) => ({
        cursor: offsetToCursor(pass.id),
        node: pass,
      }),
    },
  }),
});

const passAddedSubscription = {
  type: PassAddedPayloadType,
  subscribe: () => pubSub.asyncIterator(EVENTS.PASS.ADDED),
};

export default passAddedSubscription;
