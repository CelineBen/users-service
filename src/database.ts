import * as mongoose from "mongoose";

const mongoUrl = 'mongodb://localhost/newknow';

export default () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(mongoUrl, (e) => {
    if (e) {
      console.log(`Error connecting to MongoDB: ${e.message}`);
    }
    console.log('Connected to MongoDB')
  });
}
