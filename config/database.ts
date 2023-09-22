import Env from '@ioc:Adonis/Core/Env';
import { connect } from 'mongoose';

const MONGO_URL = Env.get('MONGO_URI');

const connectDatabase = async () => {
  await connect(MONGO_URL);
};

connectDatabase()
  .then(() => console.log('DB ONLINE'))
  .catch((error) => console.log(error))