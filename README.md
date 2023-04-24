# Welcome to Auth Service 

# Project Setup 

- clone the project on your local.
- Execute `npm install` on the same path as of your root directory of the downloaded project. 
- Create a `.env` file in the root directory and add the following environment variable.

```
PORT=3001
SYNC_DB=true
SALT=10
JWT_KEY=auth
```

- Inside the `src/config` folder create a new file `config.json` and then add the following piece of json

```
{
  "development": {
    "username": <YOUR_DB_LOGIN_NAME>,
    "password": <YOUR_DB_PASSWORD>,
    "database": "AUTH_DB_DEV",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```

- Once you've added your db config as listed above, go to the src folder from your terminal and execute `npx sequelize db:create`
and then execute `npx sequelize db:migrate`


## Seeding files 
- to seed the data for seeding files in your MySQL db run following commands sequentially .
     `npx sequelize-cli db:seed --seed 20221228174339-add-roles.js`

# API

## User Model 

- Schema example 

```
  {
        "email" : "acseeyou@gmail.com" , 
        "password" : "Ayush_18feb2002" , 
        "updatedAt": "2023-04-23T06:00:11.774Z",
        "createdAt": "2023-04-23T06:00:11.774Z"
  }

```

---

**Desc**: SignUp user

**Route** : `/signup`

**Method**: `POST`

**Body** : 

```
{

    "email" : "acyou@gmail.com" , 
    "password" : "Ayush_18feb2002"

}
  
```

**Response** : 

```
{
    "success": true,
    "message": "Successfully Created a new user",
    "data": {
        "id": 3,
        "email": "acyou@gmail.com",
        "password": "$2b$10$sdWu5cGeTKrBqMrNOS1LAePUXMXc10/1TxrvUidf/xFPHPs89RtJe",
        "updatedAt": "2023-04-23T07:24:20.833Z",
        "createdAt": "2023-04-23T07:24:20.833Z"
    },
    "err": {}
}
```
---

**Desc**: SignIn user

**Route** : `/signIn`

**Method**: `POST`

**Body** : 

```
{

    "email" : "acyou@gmail.com" , 
    "password" : "Ayush_18feb2002"

}
  
```

**Response** : 

```
{
    "success": true,
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFjeW91QGdtYWlsLmNvbSIsImlkIjozLCJpYXQiOjE2ODIzMTQ1MDIsImV4cCI6MTY4MjQwMDkwMn0.SswhyezbqtuQrBhRzkHXx5edoOEISrSsA6Wn9uGu2vU",
    "err": {},
    "message": "Successfully signedIn"
}

```

---


**Desc**: find user 

**Route** : `/users/userId`

**Method**: `GET`

**Response** : 

```
{
    "success": true,
    "message": "Successfully fetched a user",
    "data": {
        "email": "acseeyou@gmail.com",
        "id": 2
    },
    "err": {}
}

```
---

**Desc**: Authenticate user 

**Route** : `/isAuthenticated`

**Method**: `GET`

**Response** : 

```
{
    "success": true,
    "err": {},
    "data": 3,
    "message": "user is authenticated and token is valid"
}

```





