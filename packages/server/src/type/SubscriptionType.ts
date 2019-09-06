// external imports
import { GraphQLObjectType } from 'graphql';

import UserSubscriptions from '../modules/user/subscription';
import PassSubscriptions from '../modules/pass/subscription';

export default new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    ...UserSubscriptions,
    ...PassSubscriptions,
  },
});
