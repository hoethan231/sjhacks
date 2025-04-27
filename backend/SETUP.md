# Setup application

### Env setup
Run the following with conda, to create env: 
```
conda env create -f environment.yml
```

### Mongo cred setup. 
Create a `.env` file within the `/backend` folder. Then write your username and password as indicated: 

```
MONGO_URI = mongodb+srv://YOURUSER:YOURPASS@db.xtn5b1o.mongodb.net/?retryWrites=true&w=majority&appName=db
```
