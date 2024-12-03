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
the project is meant to simulate what a client would see when trying to book a flight online by first choosing a plane they will ride on then inserting their name, so they then choose a seat, and lastly they would insert ther credit card information that reserves their seat. they purpose of the simulation is to understand how clients interact with the database.

## Demo
Include a link to a demo video, deployment, or presentation. Optionally embed a GIF or image of the project in action.

## Screenshots
this is the landing page when localhost:3000 is run and fetches flights from the DB
<img width="1440" alt="Screenshot 2024-12-03 at 12 36 56 PM" src="https://github.com/user-attachments/assets/a1d77fdf-fb55-4dc7-8bfb-fc8dc0598e39">

this is the page where users insert info in a field that will be inserted into the Customer Table, and if they put correct info it should show the customer the seats they can pick for the flight they selected in the previous page

Before clicking 'Save Info':
<img width="1440" alt="Screenshot 2024-12-03 at 12 37 39 PM" src="https://github.com/user-attachments/assets/60a12a6d-05e3-40f2-8635-6e7f08c9fa51">

After clicking 'Save Info':
<img width="1440" alt="Screenshot 2024-12-03 at 12 37 47 PM" src="https://github.com/user-attachments/assets/b766591e-544a-4c20-a177-faff70da53fa">


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
1. Database Connection
   * The program connects to the user's database on `port 3000`.
   * If the connection fails, the program will not run.
2. Fetching and Displaying Flights
   * Once a connection is established, the program fetches data from the `flights` table in the database using query functions.
   * It loops through each row in the `flights` table using the `flightID` and displays the available flights as a table on the client-side HTML page.
   * Alongside each flight, a Buy button is displayed.
   * When the Buy button is clicked, the user is redirected to a separate HTML page (via a URL containing the `flightID` and other primary keys). This page prompts the user to enter their customer information.
3. Customer Information Submission
   * On the customer information page, the user fills out a form.
   * The submitted data is sent to the backend, where it is processed and inserted into the database using the `insertCustomer` query.
   * After the information is saved, a GET request is made to fetch the seat capacity of the selected flight using the 
   * `flightID` and `departmentID` from the URL.
   * The capacity is retrieved from the `FLY` database and used to dynamically generate seat selection buttons for the user.
4. Bank Account Generation
   * Once the customer is added, the program automatically generates a bank account for them in the database.
   * This account includes a randomly assigned `accountID`, a bank name, and a balance.
5. Seat Selection and Payment
   * When the user selects a seat, they are redirected to a reservation page.
   * The reservation page URL includes the `accountID`, `flightID`, and `departmentID`.
   * The page displays a form for the user to input their credit card information.
   * Once submitted, the credit card information is saved to the database using a POST request and a query function.
6. Payment Processing
   * A function is triggered to deduct the flight cost from the user’s bank account.
   * This function uses the `accountID`, `flightID`, and `departmentID` to update the user's balance in the database.
7. Reservation Creation
   * Finally, a POST request is made to insert the `reservation` into the reservations table in the database, completing the booking process.


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
* allow for customerIDs to be reuesed
* display the reservation the customer has made
* Deploy the project on a cloud server for it to be better simulated

## Status
Clearly state the current status of your project:
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

