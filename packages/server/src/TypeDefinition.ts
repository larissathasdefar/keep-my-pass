import Dataloader from 'dataloader';

import { IUser } from './modules/user/UserModel';
import { IPass } from './modules/pass/PassModel';
import User from './modules/user/UserLoader';
import Pass from './modules/pass/PassLoader';

type Key = string;

export type Dataloaders = {
  UserLoader: Dataloader<Key, IUser>;
  PassLoader: Dataloader<Key, IPass>;
};

export type GraphQLContext = {
  user?: User;
  pass?: Pass;
  dataloaders: Dataloaders;
};
