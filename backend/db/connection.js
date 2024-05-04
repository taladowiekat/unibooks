
import  mongoose  from 'mongoose';

const dbconnection=()=>{
    return(
mongoose.connect(process.env.CONNECTIONSTRING,
     { useNewUrlParser: true, useUnifiedTopology: true
     }) .then((con) => {
console.log(con.connections)
    console.log('Unibook Database connection successful !!');
  }).catch((err) => {
    console.error('Error connecting to Unibook Database:', err.message);
  }))};
  export default dbconnection;