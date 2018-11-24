## ERROR CODES

---

### Table of Contents
- [Socket Codes](#socket-codes)
    - [socket -> login](#socket---login)
    - [socket -> join](#socket---join)
    - [socket -> message](#socket---message)
- [API Codes](#api-codes)
    - [/api/*](#api)
    - [/api/genAuthToken](#apigenauthtoken)
    - [/api/register](#apiregister)

---

### Socket Codes

#### socket -> login
- `1` : `INVALID AUTH TOKEN`

#### socket -> join
- `1` : `MISSING PARAMETERS`
- `2` : `INVALID ID`

#### socket -> message
- `1` : `MISSING PARAMETERS`
- `2` : `CHANNEL DOES NOT EXIST`
- `3` : `INVALID MESSAGE TYPE`
- `4` : `PERMISSION DENIED`

---

### API Codes

#### /api/*
- `-1` : `Too many requests!`

#### /api/query/messages
- `1` : `Invalid auth token!`
- `2` : `Channel does not exist!`
- `3` : `Permission denied!`

#### /api/query/channel
- `1` : `Channel does not exist!`

#### /api/query/user
- `1` : `User does not exist!`
- `2` : `Channel does not exist!`
- `3` : `Invalid auth token!`
- `4` : `Permission denied!`

#### /api/genAuthToken
- `1` : `Email or password is incorrect!`

#### /api/register
- `1` : `Email is already in use!`
- `2` : `Nickname must be at least 3 characters long!`
- `3` : `Password strength is insufficient!`