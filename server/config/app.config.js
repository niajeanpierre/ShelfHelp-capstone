export const PORT = process.env.PORT ;
export const API_URL = process.env.API_URL;

export default {
  jwt: {
    secret: process.env.JWT_SECRET,
    tokenLife: '7d',
  },
}
