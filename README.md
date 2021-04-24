# todo-app-tutorial
Simple to-do application with react and node

The backend code is `todo-app-backend` and UI code is in `todo-app-front-end`

###Prerequisites for running this application. 
1. NodeJS
2. Mongo DB
3. Any IDE (VSCode, WebStorm, Sublime Text, ...)

###Steps to run backend application
1. Switch to backend folder ` cd {FOLDER_PATH}/todo-app-backend`
2. Do `npm install`
3. Create an `.env` file and add keys from `.sample.env` and update with your db values.   
4. Start application by running `npm run start`
5. Access the application with `http://localhost:8080/api-docs/`

###Steps to run frontend application
1. Make sure your backend application is running
2. Switch to front end folder `cd {FOLDER_PATH}/todo-app-frontend`
3. Do `npm install`
4. Start application by running `npm run start`
5. Access the application with `http://localhost:3000/`
6. Login with the user created from backend.

