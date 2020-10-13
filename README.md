# ChatApp
A fullstack chat application using Socket.io, Node.js, Express, React, Redux, TypeScript
## Table of contents
* [Description](#description)
* [Technologies used](#technologies-used)
* [Installation](#installation)
* [Usage](#usage)
* [Future developments/improvements](#future-developments/improvements)

## Description
This task was given by [&lt;/salt>](https://salt.study/) as a coding test.

The instrucitons were to build a chat application where multiple users can login and send/receive messages simultaneously. Simple error handling and user feedback messages have been included, and all the activities and messages are logged in ```server/mock_db/log.txt```. Users will also be disconnected and redirected to the landing page upon a certain inactivity time, which is set to 15 minutes.

## Technologies used
<a href="https://socket.io/" title="SocketIO"><img src="https://github.com/tomchen/stack-icons/blob/master/logos/socket.io.svg" alt="SocketIO" width="30px" height="30px"></img> Socket.io</a>  
<a href="https://nodejs.org/en/" title="Nodejs"><img src="https://github.com/tomchen/stack-icons/blob/master/logos/nodejs-icon.svg" alt="Nodejs" width="30px" height="30px"></img> Node.js</a>  
<a href="https://expressjs.com/" title="Express"><img src="https://github.com/tomchen/stack-icons/blob/master/logos/express.svg" alt="Express" width="30px" height="30px"></img> Express</a>  
<a href="https://reactjs.org/" title="React"><img src="https://github.com/tomchen/stack-icons/blob/master/logos/react.svg" alt="React" width="30px" height="30px"></img> React</a>  
<a href="https://reactrouter.com/" title="ReactRouter"><img src="https://github.com/tomchen/stack-icons/blob/master/logos/react-router.svg" alt="ReactRouter" width="30px" height="30px"></img> React Router</a>  
<a href="https://redux.js.org/" title="Redux"><img src="https://github.com/tomchen/stack-icons/blob/master/logos/redux.svg" alt="Redux" width="30px" height="30px"></img> Redux</a>  
<a href="https://www.typescriptlang.org/" title="TypeScript"><img src="https://github.com/tomchen/stack-icons/blob/master/logos/typescript-icon.svg" alt="TypeScript" width="30px" height="30px"></img> TypeScript</a>  
<a href="https://jestjs.io/" title="Jest"><img src="https://github.com/tomchen/stack-icons/blob/master/logos/jest.svg" alt="Jest" width="30px" height="30px"></img> Jest</a>  
<a href="https://www.chaijs.com/" title="Chai"><img src="https://github.com/tomchen/stack-icons/blob/master/logos/chai.svg" alt="Chai" width="30px" height="30px"></img> Chai</a>  
<a href="https://devexpress.github.io/testcafe/" title="TestCafé"><img src="https://github.com/johnnyka/TechStack-icons/blob/main/logos/testcafe.svg" alt="TestCafé" width="30px" height="30px"></img> TestCafé</a>  

## Installation
Make sure you have installed the technologies above on you machine.

## Usage
Try it out for yourself, [link](https://chat-app-johnnykan.herokuapp.com/).


Or if you'd rather run it locally on your machine, follow the steps below.
Run the backend server:
```
cd server
npm install
npm run start
```
Run the frontend client:
```
cd client
npm install
npm run start
```

Go to [http://localhost:3000](http://localhost:3000). The rest should be quite self explanatory. Below are some images to give you a hint. Enjoy 😄

![LandingPage.png](/Pics/LandingPage.png) ![LandingPage_server_unavailable.png](/Pics/LandingPage_server_unavailable.png)
![ChatPage_1.png](/Pics/ChatPage_1.png) ![ChatPage_2.png](/Pics/ChatPage_2.png) ![ChatInfoPage.png](/Pics/ChatInfoPage.png)
![LandingPage_disconnected_inactivity.png](/Pics/LandingPage_disconnected_inactivity.png)

## Future developments/improvements
* Consider React Native app for mobiles.
* Migrate client socket to Redux middleware to avoid side effects etc.
* Implement database for logging the chat messages/activities.
* Add dark theme in client. Possibly also other color themes.
* Add user pics/avatars.
* Add more chat rooms.
* Add functionality to send images.
* ...
