
import  mongoose  from 'mongoose';
const connectionString = 'mongodb+srv://aishasaleh:0LcLzyqIs62mkZQ6@cluster0.0dqhjtr.mongodb.net/';
const dbconnection=()=>{
    return(
mongoose.connect(connectionString,
     { useNewUrlParser: true, useUnifiedTopology: true
     }) .then((con) => {
console.log(con.connections)
    console.log('Unibook Database connection successful !!');
  }).catch((err) => {
    console.error('Error connecting to Unibook Database:', err.message);
  }))};
  export default dbconnection;