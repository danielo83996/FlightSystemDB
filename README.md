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
Link to video

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
5. install `node.js`, and Run the application in the terminal: `node app.js`

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
this function call in flight.html is significant because it fetches data from `flights` table and the only way for the client and the server to communicate with each other before the client puts in their information
````HTML
<script>
        async function fetchFlights() {
            try {
                const response = await fetch('/flights')
                const flights = await response.json()
                const flightsTableBody = document.getElementById('flights-table-body')
                flights.forEach(flight => {
                    const row = document.createElement('tr')
                    row.innerHTML = `
                        <td>${flight.flightID}</td>
                        <td>${flight.departmentID}</td>
                        <td>${flight.depart_city}</td>
                        <td>${flight.depart_state}</td>
                        <td>${flight.arrive_city}</td>
                        <td>${flight.arrive_state}</td>
                        <td>${new Date(flight.depart_date).toLocaleString()}</td>
                        <td>${new Date(flight.arrive_time).toLocaleString()}</td>
                        <td>$${flight.flight_price}</td>
                        <td><a href="index.html?flightID=${flight.flightID}&departmentID=${flight.departmentID}"><button>Buy</button></a></td>
                        
                    `
                    flightsTableBody.appendChild(row)
                })
            } catch (error) {
                console.error('Error fetching flights:', error)
            }
        }

        fetchFlights()
    </script>

````
this code snippit is when we first insert an item into the database and allows us to create a customer whos ID will be frequently used
````javascript
  const inputBox = document.querySelector('#Fname');
  const Fname = inputBox.value.trim();
  const Lname = document.querySelector('#Lname').value.trim();
  const DOB = document.querySelector('#dob').value.trim();
  const pnumber = document.querySelector('#pnumber').value.trim();
  const gender = document.querySelector('#gender').value.trim();
  const email = document.querySelector('#email').value.trim();

  // Validate form inputs
  if (!Fname || !Lname || !DOB || !pnumber || !gender || !email) {
    alert('All fields must be filled out.');
    return;
  }

  try {
    const body = { Fname, Lname, DOB, pnumber, gender, email };

    const response = await fetch('http://localhost:3000/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
````


## Features
features FlightSystemDB supports:
* Database Integration
* User-Friendly Navigation
* Customer Management

### Future Enhancements
potential features to add in the future:
* allow for customerIDs to be reuesed
* display the reservation the customer has made
* Deploy the project on a cloud server for it to be better simulated

## Status
status of the FlightSystemDB:
* _Completed_: No further updates planned, but open to feedback and collaboration.

## Challenges
Document any challenges faced during the project:
* extracting values from tables
* displaying items that are with a table whether it was rows or a single vale
* Integration of databse with `SELECTION`, `INSERTION`, and `UPDATE`

## Learnings
* how to `SELECT` and `INSERT` into a database through a webapplication.
* Improved skills in debugging deployment issues.
* Learned to manage collaborative projects efficiently.

## Contributors
List all contributors involved in the project:
* [Daniel](https://github.com/danielo83996) - Backend Dev
    * vhandeled the insertion and modification of tables in the DB  
* [Van](https://github.com/vana1219) - fullstack Dev
    * created the webpages and the CSS for them, as well as handling selection from DB  

