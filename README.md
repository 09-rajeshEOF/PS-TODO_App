
# PS-TODO_App




## Run Locally

Clone the project

```bash
  git clone https://github.com/09-rajeshEOF/PS-TODO_App.git
  Node Version v21.7.1
```


Go to the project directory

```bash
  cd backend
```


Start the server

```bash
  npx ts-node ./src/app.ts
```
  or
```bash
  nodemon --exec ts-node ./src/app.ts
```
for Deploying
```bash
  nodemon --exec  ./build/app.js
```


## Installation

Install dependencies(please check package.json for more info)

```bash
npm init

npm install ts-node express @types/express jsonwebtoken @types/jsonwebtoken mocha @types/mocha chai @types/chai supertest @types/supertest mongoose @types/mongoose
```
If using yarn 

```bash
yarn add ts-node express @types/express jsonwebtoken @types/jsonwebtoken mocha @types/mocha chai @types/chai supertest @types/supertest mongoose @types/mongoose
```

    
## Features

- Register
- Sign In / Authentication
- Add Tasks
- Update Tasks
- Delete Tasks
- Get All Tasks of a User
- Only Users can Manipulate their Tasks
- Api Authorization usng Jwt




## Tech Stack


**Server:** Node, Typescript, Express, Jwt, MongoDB atlas 


## Running Tests

To run tests, run the following command

```bash
  npm run test
```
or
```bash
  npx mocha --require ts-node/register ./test/routes/<Test File name>.test.ts
```


## Documentation

[PostMan Documentation (Raw)](https://documenter.getpostman.com/view/34063100/2sA3kUHNYg)


## Optimizations

What optimizations did you make in your code? E.g. refactors, performance improvements, accessibility


## Screenshots

**Register**

[![Register.png](https://i.postimg.cc/HxXyVHDb/Register.png)](https://postimg.cc/wyxvGCBB)

**Format Mismatch**

[![NOt-Valid-Register.png](https://i.postimg.cc/CMJKJdNz/NOt-Valid-Register.png)](https://postimg.cc/dDkvVsgY)

**Sign In User/Authentication**

[![Sign-In.png](https://i.postimg.cc/zfmD3hJP/Sign-In.png)](https://postimg.cc/18H1jfVp)

**Invalid Credentials**

[![Invalid-Credentials.png](https://i.postimg.cc/TPrdbP12/Invalid-Credentials.png)](https://postimg.cc/Y4CBKMQT)

**If Email Not found**

[![Please-Sign-up-to-continue.png](https://i.postimg.cc/FznNvdWp/Please-Sign-up-to-continue.png)](https://postimg.cc/tnPLtTHn)

**Existing Task/Redundancy check**

[![Task-Alreday-exists.png](https://i.postimg.cc/500rVPhc/Task-Alreday-exists.png)](https://postimg.cc/4KDPv14w)

**Add Task**

[![Adding-Tasks.png](https://i.postimg.cc/6TsbCByw/Adding-Tasks.png)](https://postimg.cc/4H51gk6F)

**Update Task**

[![Update-Tasks.png](https://i.postimg.cc/W4fBhL6p/Update-Tasks.png)](https://postimg.cc/06DWB4Bh)

**Delete Task**

[![Delete-Task.png](https://i.postimg.cc/KvMBWns0/Delete-Task.png)](https://postimg.cc/rKqD0tT4)

**Get All Tasks of a User**

[![Get-All-Task-of-User.png](https://i.postimg.cc/mg1X8zQ4/Get-All-Task-of-User.png)](https://postimg.cc/cvZBJJ9k)


 
