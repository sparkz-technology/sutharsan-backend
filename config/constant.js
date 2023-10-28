import dotenv from "dotenv";
dotenv.config();
const constant = {
  YOUR_EMAIL: process.env.YOUR_EMAIL,
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY,
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  ClIEND_URL: process.env.ClIEND_URL,
  github: {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
};

export default constant;
