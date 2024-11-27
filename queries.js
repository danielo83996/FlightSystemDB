const queries = {
    createCustomerTable: `CREATE TABLE IF NOT EXISTS customer (
        custID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	Lname VARCHAR(50),
	Fname VARCHAR(50) NOT NULL,
	DOB DATE,
	pnumber VARCHAR (15),
	gender VARCHAR(10),
	email	 VARCHAR(50)) `,
    createPaymentTable: `CREATE TABLE IF NOT EXISTS payment(
	transactionID INT PRIMARY KEY NOT NULL,
	accountID INT
	FOREIGN KEY(accountID) REFERENCES BANK ACCOUNT(accountID),
	price DECIMAL(50,2) NOT NULL
	);
`,
    createReserveTable: `CREATE TABLE IF NOT EXISTS RESERVATION(
    confirmation_number INT() PRIMARY KEY NOT NULL,
    customerID INT() NOT NULL,
    seat_number INT() NOT NULL,
    flightID INT() NOT NULL,
    transactionID INT() NOT NULL,
    reserve_date DATE NOT NULL,
    FOREIGN KEY (customerID) REFERENCES CUSTOMER(customerID),
    FOREIGN KEY (flightID) REFERENCES FLIGHT(flightID),
    FOREIGN KEY (transactionID) REFERENCES PAYMENT(transactionID),
);`,
    insertCustomer: `INSERT INTO customer (Lname, Fname, DOB, pnumber, gender, email) VALUES (?, ?, ?, ?, ?, ?)`,
    getCustomerById: `SELECT * FROM customer WHERE custID = ?`,
    selectCustomer: `SELECT * FROM customer`,
  };
  
  module.exports = queries;