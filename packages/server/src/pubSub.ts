import { PubSub } from 'graphql-subscriptions';

export const EVENTS = {
  USER: {
    ADDED: 'USER_ADDED',
  },
  PASS: {
    ADDED: 'PASS_ADDED',
  },
};

export default new PubSub();
