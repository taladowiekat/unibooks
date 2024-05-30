
import mongoose from 'mongoose';

const dbconnection = () => {
  return (
    mongoose.connect(process.env.CONNECTIONSTRING).then(() => {
        console.log('Unibook Database connection successful !!');
      }).catch((err) => {
        console.error('Error connecting to Unibook Database:', err.message);
      }))
};
export default dbconnection;