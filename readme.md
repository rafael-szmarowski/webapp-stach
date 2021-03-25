Stach is a hairdresser booking web app using React and Reactstrap for the Frontend and ExpressJS for the Backend.
This web app is my personnal work inspired by a group draft project of the mobile version in React Native of Stach.  

Getting Started

Add files with your own connexion to MongoDB dataBase

.env : BDD_CONNECT='mongodb+srv://xxxxx:xxxxx@cluster0.3eest.mongodb.net/stach?retryWrites=true&w=majority'
.test.env : BDD_CONNECT='mongodb+srv://xxxxx:xxxxx@cluster0.3eest.mongodb.net/stach?retryWrites=true&w=majority'

If you want examples of shops, you can use datas from the folder "stachBDDExport" and create a database named "stach" and import collections appointments, comments, shops and users.

Run both the backend with npm start and then frontend reactapp with npm start

To run the tests use 
for Windows users : set NODE_ENV=test&&npm run test
for Linux users : NODE_ENV=test npm run test

To see an example of how the app is running, please follow this link : https://salty-woodland-65373.herokuapp.com/

Good coding and have fun !

