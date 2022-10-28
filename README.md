# Battleship
A simple Battleship for a school project


To run this project, you will need to execute the following instructions :

### Getting the project :
Open a terminal and run :
_$ git clone https://github.com/Serquand/Battleship_

Now, you'll have to setup the back-end and the front-end


### Back-end:

Go to the api folder and in a first time, make a :
_$  npm i_ to install the dependecies

Then, you'll have to create a MySQL database which you can call as you want.

After that, you'll have to setup the back-end and the environment constant.
In a first time, you'll need a .env file, so let's started with a : 
_$ cp .env.example .env_ 
Now, you'll need to fill the .env files with your database password, the name of the database, and all the other thing which is ask to you.

Then, you can run _$npm run start_ to start the API, and we are going to setup the front-end now !

### Front-end:

Go to the site folder and in a first time, make a : 
_$ npm i_ to install the dependencies

Then, you can start the client with a : 
_$ npm run serve_

You can now go to the _http://localhost:8080_ with your browser and see the project