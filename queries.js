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
	accountID INT,
	FOREIGN KEY(accountID) REFERENCES BANKACCOUNT(accountID),
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
    createCreditCardTable: `CREATE TABLE IF NOT EXISTS credit_info(
    card_number int NOT NULL,
    secure_number int NOT NULL,
     expire_date date,
     card_holder varchar(100) NOT NULL,
    card_type varchar(25),
     accountID INT NOT NULL,
     custID int NOT NULL,
    FOREIGN KEY(accountID) REFERENCES
	BANKACCOUNT(accountID),
    FOREIGN KEY(custID) REFERENCES
	customer(custID),
    PRIMARY KEY(accountID, custID, card_number)
);`, 
    insertCustomer: `INSERT INTO customer (Lname, Fname, DOB, pnumber, gender, email) VALUES (?, ?, ?, ?, ?, ?)`,
    insertCreditCard: `INSERT INTO credit_info(card_number, secure_number,expire_date,card_holder,card_type,accountID, custID) VALUES(?, ?, ?, ?, ?, ?, ?)`,
    insertBankAccount: `INSERT INTO bankaccount (accountID, custID, bank_name, balance) VALUES (?, ?, ?, ?)`,
    getCustomerById: `SELECT custID FROM customer ORDER BY custID DESC LIMIT 1`, 
    getAccount: `SELECT accountID FROM bankaccount WHERE custID = ?`,
    updateSeatCount: 'UPDATE fly SET capacity = capacity - 1 WHERE departmentID = ? AND flightID = ?',
    getCapacity: `SELECT capacity FROM fly WHERE departmentID = ? AND flightID = ?`

  };
  
  export default queries;