export const PORT = process.env.PORT || 3001;
export const API_URL = process.env.API_URL || "/api";

export default {
  jwt: {
    secret: process.env.JWT_SECRET || 'jwt-secret',
    tokenLife: '7d',
  },
}
