import 'dotenv/config'


const envConfig = {
  port: process.env.PORT,
  connectionString : process.env.CONNECTION_STRING,
  secretKey:process.env.SECRET_KEY,
  user:process.env.USER,
  pass:process.env.PASS,
  host:process.env.HOST,
  adminEmail:process.env.ADMIN_EMAIL,
  adminUsername:process.env.ADMIN_USERNAME,
  adminPassword:process.env.ADMIN_PASSWORD
};

export default envConfig