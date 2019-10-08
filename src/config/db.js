const { SERV_JWT, MONGO_URL } = process.env;

export default {
  secret: SERV_JWT,
  database: MONGO_URL
};
