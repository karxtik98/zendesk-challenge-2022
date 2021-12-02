# Zendesk challenge 2022


## Installation and Usage

In this repository we have 2 main directories, client and server.

Inside the client directory we have the Frontend for our ticket viewer application, which uses React (bootstrapped with Create-React-App).

Inside the server directory we have the Backend for our ticket viewer application, which uses Node.js and Express.

The below will contain detailed instructions on how to set up this project and run it locally, along with the commands to write in terminal at each step.

#### Before anything else
1. Clone the repository
2. Install node.js (v14 or greater)

#### Server Installation:
1. Enter the server directory ```cd server```.
2. Run npm install to install all dependencies ```npm install```.
3. create a .env file ```touch .env```.
4. In your favourite text editor, copy the contents of the ```.env.example``` file, and paste this into the .env file.
5. Then, replace ```zcckartik``` in the ZENDESK_DOMAIN variable with your zendesk username, replace the email in the EMAIL varaible with the email associated with your zendesk acccount, and replace the token in the TOKEN variable with your zendesk api access token (ensure that it is your access token not password, and that token access is activated for your zendesk account).
6. Run ```npm run dev``` to start your server!

#### Client Installation:
1. Enter the client directory ```cd client```.
2. Run npm install to install all dependencies ```npm install```.
3. Create a .env file ```touch .env```.
4. In your favourite text editor, add this line to the .env file ```REACT_APP_SERVER_URL=http://localhost:4001```.
5. Ensure that your server is already running, and then finally run ```npm start```!

#### Tests
Run tests in both directories with ```npm run test```
