import 'dotenv/config'


const envConfig = {
  port: process.env.PORT,
  connectionString : process.env.CONNECTION_STRING,
  secretKey:process.env.SECRET_KEY,
  user:process.env.USER,
  pass:process.env.PASS,
  host:process.env.HOST
};

export default envConfig