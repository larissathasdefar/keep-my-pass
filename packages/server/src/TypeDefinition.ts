import Dataloader from 'dataloader';

import { IUser } from './modules/user/UserModel';
import { IPass } from './modules/pass/PassModel';

type Key = string;

export type Dataloaders = {
  UserLoader: Dataloader<Key, IUser>;
  PassLoader: Dataloader<Key, IPass>;
};

export type GraphQLContext = {
  user?: IUser;
  pass?: IPass;
  dataloaders: Dataloaders;
};
