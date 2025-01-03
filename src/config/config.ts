import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;
const baseURL = process.env.BASE_URL

const CONFIG = {
  BASE_URL: baseURL,
  PORT: port,
  //mongodb uri
  MONGODB_URI:process.env.MONGODB_URI,
  // The secret for the encryption of the jsonwebtoken
  JWT_SECRET: process.env.JWT_SECRET,

  //google auth
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

export default CONFIG;
