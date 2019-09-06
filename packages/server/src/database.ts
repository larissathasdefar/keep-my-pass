

import mongoose from 'mongoose';
// import { databaseConfig } from './config';

export function connectDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(
      // databaseConfig,
      'mongodb+srv://app:keep-my-pass@keep-my-pass-lam22.mongodb.net/entria?retryWrites=true',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
      },
    );
  });
}
