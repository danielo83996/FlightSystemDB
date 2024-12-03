# FlightSystemDB(SLAY BOOKING FLIGHT)

> Travel the World Without Breaking the Bank?(simulation).

## Table of Contents
* [Overview](#overview)
* [Demo](#demo)
* [Screenshots](#screenshots)
* [Technologies Used](#technologies-used)
* [Setup Instructions](#setup-instructions)
* [How It Works](#how-it-works)
* [Code Snippets](#code-snippets)
* [Features](#features)
* [Status](#status)
* [Contributors](#contributors)

## Overview
Provide a summary of the project, its purpose, and the problem it solves. Mention if it was built during a hackathon or for a specific challenge.

## Demo
Include a link to a demo video, deployment, or presentation. Optionally embed a GIF or image of the project in action.

## Screenshots
Add 1-3 images showcasing the main features of your project. Describe the screenshots briefly.

## Technologies Used
* SQL
* JavaScript
* HTML
* CSS

## Setup Instructions
Explain how to set up and run the project locally. For example:
1. Clone the repository: `git clone https://github.com/danielo83996/FlightSystemDB.git`
2. got to mySQL and create necessary table/database:
   ````SQL
   #creates the databse that will store the data
   CREATE DATABASE test;

   #creates the department that we will use to check where each flight goes
   CREATE TABLE DEPARTMENT(
	 departmentID VARCHAR(25) PRIMARY KEY Not Null,
	 department_name VARCHAR(25) Not Null)

   #creates the planes that will fly out
   CREATE TABLE FLIGHTS(
   flightID VARCHAR(25) PRIMARY KEY Not Null,
   departmentID VARCHAR(25),
   FOREIGN KEY (departmentID) REFERENCES DEPARTMENT(departmentID),
   depart_city VARCHAR(20) Not Null,
   depart_state VARCHAR(5) Not Null,
   arrive_city VARCHAR(20) Not Null,
   arrive_state VARCHAR(5) Not Null,
   depart_date DATETIME Not Null,
   arrive_time DATETIME Not Null,
   flight_price DECIMAL(50,2) Not Null			
   );

   #this is created the planes availabilty and flight duration
   CREATE TABLE FLY( 
   departmentID VARCHAR(10) NOT NULL, 
   flightID INT NOT NULL, 
   capacity INT NOT NULL, 
   duration DECIMAL(5,2) NOT NULL,
   PRIMARY KEY (departmentID, flightID) );
   ;
   
   ````
3. insert values for test simulation:
   ````SQL
   #values for the department the plane is flying for
   INSERT INTO DEPARTMENT(departmentID,department_name ) VALUES ('DL01', 'Delta Airline')
   #value for which plane it is
   INSERT INTO FLIGHTS(flightID, departmentID, depart_city, depart_state, arrive_city, arrive_state, depart_date, arrive_time, flight_price) VALUES
    (1, 'DL01', 'SanFrancisco', 'CA', 'Chicago', 'IL', '2024-01-01 13:00:00', '2024-01-01 20:00:00', 400.00)
   #value for the specific flight log of the plane
   INSERT INTO Fly (departmentID, flightID, capacity, duration) VALUES ('DL01',1, 180, 3.5)

   ````
   
4. change DAO.js and DATABASE.js to your mySQL login:
   ````javascript
    mysql.createConnection({
      host: '127.0.0.1', // Your database host
      user: 'root', // Your MySQL username
      password: 'pword', // Your MySQL password
      port: '3306', // Your MySQL port, normally "3306"
      database: 'test', // DO NOT EDIT (You need to create a "test" database from your "MySQL Workbench")
    });

   ````
5. Run the application: `node app.js`

## How It Works
Describe the core workflow or logic of the project in a few points. You can break it into steps or modules for clarity.

## Code Snippets
Include a small, key snippet of code to highlight an interesting or critical part of your project. For example:
````SQL
# Example: Training a machine learning model
model.fit(train_data, train_labels, epochs=10, validation_split=0.2)

````

## Features
Highlight the features your project currently supports:
* User authentication
* Real-time predictions
* Mobile responsiveness

### Future Enhancements
List potential features to add in the future:
* Add more datasets
* Improve accuracy
* Deploy the project on a cloud service

## Status
Clearly state the current status of your project:
* _In Progress_: Actively working on new features and improvements.
* _Completed_: No further updates planned, but open to feedback and collaboration.

## Challenges
Document any challenges faced during the project:
* Handling large datasets with limited compute power.
* Training the model on imbalanced datasets.
* Integration of multiple APIs for seamless functioning.

## Learnings
* Enhanced understanding of model optimization techniques.
* Improved skills in debugging deployment issues.
* Learned to manage collaborative projects efficiently.

## Contributors
List all contributors involved in the project:
* [Daniel](https://github.com/danielo83996) - Backend Dev
    * vhandeled the insertion and modification of tables in the DB  
* [Van](https://github.com/vana1219) - fullstack Dev
    * created the webpages and the CSS for them, as well as handling selection from DB  

