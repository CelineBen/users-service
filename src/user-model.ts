import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

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

const SALT_ROUNDS = 10;

const User = mongoose.model('User', UserSchema);

export async function createUser(userData) {
  const user = new User(userData);
  user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  await user.save();
  return user;
}

export async function isValidPassword(username, givenPassword) {
  const user = await User.findOne({ username });
  return bcrypt.compare(givenPassword, user.password);
}

export function getByUsername(username: String) {
  return User.findOne({ username });
}

export function getUsers() {
  return User.find({}, '_id username');
}