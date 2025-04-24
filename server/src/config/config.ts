import 'dotenv/config'


const envConfig = {
  port: process.env.PORT,
  connectionString : process.env.CONNECTION_STRING,
  secretKey:process.env.SECRET_KEY
};

export default envConfig