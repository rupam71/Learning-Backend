import mongoose, { ConnectOptions } from 'mongoose';

export default async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    } as ConnectOptions);
    console.log('Database Connected');
  } catch (error) {
    console.log('Database Error :: ', error);
  }
};
