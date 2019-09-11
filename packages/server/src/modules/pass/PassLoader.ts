import DataLoader from 'dataloader';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import { Types } from 'mongoose';
import { ConnectionArguments } from 'graphql-relay';
import mongoose from 'mongoose';
declare type ObjectId = mongoose.Schema.Types.ObjectId;

import PassModel, { IPass } from './PassModel';

import { GraphQLContext } from '../../TypeDefinition';

export default class Pass {
  id: string;

  _id: Types.ObjectId;

  website: string;

  password: string;

  user: string;

  constructor(data: IPass, { pass }: GraphQLContext) {
    this.id = data._id;
    this._id = data._id;
    this.website = data.website;
    this.user = data.user;
    this.password = data.password;
  }
}

export const getLoader = () => new DataLoader((ids: ReadonlyArray<string>) => mongooseLoader(PassModel, ids));

const viewerCanSee = () => true;

export const load = async (context: GraphQLContext, id: string | Object | ObjectId): Promise<Pass | null> => {
  if (!id && typeof id !== 'string') {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.PassLoader.load((id as string));
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
export const loadPasses = async (context: GraphQLContext, pass: PassArgs) => {
  if (!pass) {
    return null;
  }

  try {
    const passes = await PassModel.find({ pass });
    return passes;
  } catch (err) {
    return null;
  }
};
