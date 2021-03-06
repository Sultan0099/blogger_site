module.exports = {
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  mailgunOptions: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  },
  googleClientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  urlCallBack: process.env.GOOGLE_URL_CALLBACK,
  cookieSecret: process.env.COOKIE_SECRET,
  clientOrigin: ""
};
