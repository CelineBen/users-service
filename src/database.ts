import * as mongoose from 'mongoose';

const mongoUrl = 'mongodb://localhost/newknow';

export default async () => {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB');
  } catch (e) {
    console.log(`Error connecting to MongoDB: ${e.message}`);
  }
}
