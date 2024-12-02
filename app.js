import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import AppDAO from './DAO.js';
import Repository from './repository.js';
import { getFlights, getFlight } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize DAO and Repository
const dao = new AppDAO();
const customerRepository = new Repository(dao);
customerRepository.createCustomerTable();
//customerRepository.createPaymentTable();
//customerRepository.createReserveTable(); 
//customerRepository.createCreditCardTable();

// Routes

// Get all flights
app.get('/flights', async (req, res) => {
    console.log('Received request for /flights');
    try {
        const flights = await getFlights();
        res.json(flights);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Get a flight by ID
app.get('/flights/:id', async (req, res) => {
    console.log(`Received request for /flights/${req.params.id}`);
    try {
        const flight = await getFlight(req.params.id);
        res.json(flight);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}); 
// Get a customer by ID 
app.get('/customers/:id', async (req, res) => {
    try {
        const customer = await customerRepository.getCustomerById();  // This will return only custID
        console.log('Customer ID:', customer);
        if (!customer) {
            return res.status(404).send('Customer not found');
        }
        res.json(customer);  // Only return the custID as JSON
    } catch (err) {
        console.error('Error fetching customer:', err.message);
        res.status(500).send('Server error');
    }
});



// Insert a new customer
app.post(`/customers`, async (req, res) => {
    try {
        const { Lname, Fname, DOB, pnumber, gender, email } = req.body;
        const newCustomer = await customerRepository.insertCustomer(Lname, Fname, DOB, pnumber, gender, email);
        console.log('Inserted customer:', newCustomer);
        res.json(newCustomer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Insert a new credit card
app.post(`/credit-card`, async (req, res) => {
    try {
      const { card_number, secure_number, expiere_date, card_holder, card_type, custID } = req.body;
      if (!card_number || !secure_number || !expiere_date || !card_holder || !card_type || !custID) {
        return res.status(400).json({ error: 'All fields are required.' });
      }
  
      // Fetch accountID based on custID
      const accountDetails = await customerRepository.getAccount(custID);
      if (!accountDetails || !accountDetails.accountID) {
        return res.status(404).json({ error: 'Bank account not found for customer.' });
      }
  
      const accountID = accountDetails.accountID;
      console.log('this is the accountID that is parsed through',accountID);
  
      // Insert the new credit card
      const newCreditCard = await customerRepository.insertCreditCard(
        card_number,
        secure_number,
        expiere_date,
        card_holder,
        card_type,
        accountID,
        custID
      );
  
      console.log('Inserted card:', newCreditCard);
      res.status(201).json({ success: true, card: newCreditCard });
    } catch (err) {
      console.error('Error inserting credit card:', err.message);
      res.status(500).json({ error: 'Server error while inserting credit card.' });
    }
  });
  


// Get flight capacity by flightID and departmentID using POST
app.post('/flight-capacity', async (req, res) => {
    const { flightID, departmentID } = req.body; // Extract from the body
    if (!flightID || !departmentID) {
      return res.status(400).json({ error: 'Missing flightID or departmentID' });
    }
  
    try {
      console.log('Fetching capacity for:', { flightID, departmentID });
      const capacity = await customerRepository.getCapacity(departmentID, flightID);
      console.log('Capacity Result:', capacity);  // Log the capacity result here
  
      if (capacity === null || capacity === undefined) {
        return res.status(404).json({ error: 'Flight not found or no capacity data' });
      }
  
      res.json([{ capacity }]);  // Ensure the response is wrapped in an array with the capacity
    } catch (err) {
      console.error('Error in /flight-capacity route:', err.message);
      res.status(500).send('Server error');
    }
  });  

  app.get('/bank-account/:id', async (req, res) => {
    try {
      const custID = parseInt(req.params.id, 10); // Extract accountID from the request params
      console.log(`Received request for accountID: ${custID}`);
  
      // Find the bank account in the database
      const account = bankaccount.find((acc) => (acc.custID === custID));
  
      if (!account) {
        // If no account is found, send a 404 response
        return res.status(404).json({ error: 'Bank account not found' });
      }
  
      // Respond with the accountID and custID
      res.json({
        accountID: account.accountID,
        custID: account.custID,
      });
    } catch (error) {
      // Handle errors
      console.error('Error fetching bank account:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Insert a new bank account
app.post('/bank-account', async (req, res) => {
    try {
        const { accountID, custID, bank_name, balance } = req.body;

        // Validate required fields
        if (!accountID || !custID || !bank_name || !balance) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Insert the new bank account
        const result = await customerRepository.insertBankAccount(accountID, custID, bank_name, balance);
        console.log('Inserted bank account:', result);

        res.status(201).json({ success: true, message: 'Bank account inserted successfully', result });
    } catch (err) {
        console.error('Error inserting bank account:', err.message);
        res.status(500).json({ error: 'Server error while inserting bank account.' });
    }
});


// Serve flight.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'flight.html'));
});

// Serve static files
app.use(express.static('public'));

// Serve index.html for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
