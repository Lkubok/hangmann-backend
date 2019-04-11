1. The App will automaticly restore DB collection of quotes if it somehow will be empty
2. If you want it to be running on your environment you should have mongoDB server installed
3. The base db conecctions are set in config/variables
4. By default it connects to mongoDB on localhost without a password, if you want to user password, please change the variables file (MONGO_URL)
4. run node run start to launch the app on your machine