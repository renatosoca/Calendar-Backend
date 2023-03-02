import mongoose from 'mongoose';
import dotenv from 'dotenv/config';

const dbConnection = async () => {
  mongoose.set( 'strictQuery', false );

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const url = `Puerto: ${db.connection.port}. Database: ${db.connection.name}`;
    console.log(url);
  } catch (error) {
    console.log(error);
    throw new Error('Error al iniciar la base de datos');
  }
}

export {
  dbConnection,
}