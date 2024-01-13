# Cary Online Car Rental System 
## What is Cary 
This is an online platform Built using React for the frontend node.js for the server and Mongo.db for data persistence  which enables a user to book a car for hire 
## How to use
git clone the repository. in this folder, you will get 3 folders the backend for the system in the backend folder the FRentee folder is the admins _The person/ persons responsible for adding and deleting tracking bookings and users on the system_  side of the project and the frontend folder is the frontend side of the user _person renting the car_ 
**YOU SHOULD HAVE BASH INSTALLED AND SET AS THE TERMINAL IN VS CODE IF YOU WOULD LIKE TO RUN THE BASH SCRIPT**
**MAKE SURE YOU  _npm install_ TO INSTALL ALL NECESSARY PACKAGES**
### Step 1
1. open a new terminal and run the bash script called startBackend.sh 
    if you do not have bash do this 
        ```
        cd backend
        npm run nodemon
        ```
    The Server should start 
### Step 2
1. open a new terminal and run the bash script called startRentors.sh 
    if you do not have bash do this 
        ```
        cd frentee/rentee
        echo "entered rentors side"
        npm run dev
        ```
    The renters side should start 
### Step 3
1. open an new terminal and run the bash script called startUsers.sh 
    if you do not have bash do this 
        ```
        cd frontend/cary
        echo "Entred cary folder"
        npm run dev
        ```
    The Users side should start 
## Author 
### Mohamed Abdiladif 

