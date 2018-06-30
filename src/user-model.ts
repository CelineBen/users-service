import * as mongoose from 'mongoose';
import * as _ from 'lodash';
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);

export async function createUser(userData) {
  const user = new User(userData);
  await user.save();
  return user;
}

export async function userExists(username: String): Promise<boolean> {
  const user = await User.findOne({ username });
  return !_.isEmpty(user);
}