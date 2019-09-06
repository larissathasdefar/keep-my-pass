import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

const schema = new mongoose.Schema(
  {
    website: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'pass',
  },
);

export interface IPass extends Document {
  website: string;
  password: string;
  user: string;
  authenticate: (plainTextPassword: string) => boolean;
}

schema.methods = {
  authenticate(plainTextPassword: string) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
};

// this will make find, findOne typesafe
const PassModel: Model<IPass> = mongoose.model('Pass', schema);

export default PassModel;
