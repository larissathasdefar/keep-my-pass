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

export const load = async (context: GraphQLContext, id: string): Promise<Pass | null> => {
  if (!id) {
    return null;
  }

  try {
    const data = await context.dataloaders.PassLoader.load(id)
    return new Pass(data, context);
  } catch (err) {
    return null;
  }
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId) => dataloaders.PassLoader.clear(id.toString());
export const primeCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId, data: IPass) => dataloaders.PassLoader.prime(id.toString(), data);
export const clearAndPrimeCache = (context: GraphQLContext, id: Types.ObjectId, data: IPass) => clearCache(context, id) && primeCache(context, id, data);

export const loadPasses = async (context: GraphQLContext, user: string) => {
  if (!user) {
    return null;
  }

  try {
    const passes = await PassModel.find({ user });
    return passes;
  } catch (err) {
    return null;
  }
};
