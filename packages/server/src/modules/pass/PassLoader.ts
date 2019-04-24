import DataLoader from 'dataloader';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import { Types } from 'mongoose';
import { ConnectionArguments } from 'graphql-relay';

import PassModel, { IPass } from './PassModel';

import { GraphQLContext } from '../../TypeDefinition';

export default class Pass {
  id: string;

  _id: Types.ObjectId;

  website: string;

  password: string;

  user: string;

  constructor(data: IPass, { pass }: GraphQLContext) {
    this.id = data.id;
    this._id = data._id;
    this.website = data.website;
    this.user = data.user;
    this.password = data.password;
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(PassModel, ids));

const viewerCanSee = () => true;

export const load = async (context: GraphQLContext, id: string): Promise<Pass | null> => {
  if (!id) {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.PassLoader.load(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee() ? new Pass(data, context) : null;
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId) => dataloaders.PassLoader.clear(id.toString());
export const primeCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId, data: IPass) => dataloaders.PassLoader.prime(id.toString(), data);
export const clearAndPrimeCache = (context: GraphQLContext, id: Types.ObjectId, data: IPass) => clearCache(context, id) && primeCache(context, id, data);

type PassArgs = ConnectionArguments & {
  search?: string;
};
export const loadPasses = async (context: GraphQLContext, user: string, args: PassArgs) => {
  if (!user) {
    return null;
  }
  const passes = PassModel.find({ user });

  return connectionFromMongoCursor({
    cursor: passes,
    context,
    args,
    loader: load,
  });
};
