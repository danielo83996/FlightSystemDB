const express = require('express');
const app = express();
const cors = require('cors');

const AppDAO = require('./DAO');
const Repository = require('./repositiory');
//const Customer = require('./model');

app.use(express.static('public'));

// middleware
app.use(cors());
app.use(express.json());

//ROUTES

//get all todo
app.get('/Customer', async (req, res) => {
  try {
    console.log('try to fetch'); 
    const allCustomers = await customerRepository.getAllCustomers();
    console.log('get all todos ', allCustomers);
    res.json(allCustomers); 
  } catch (err) {
    console.log(err.message);
  }
});

//get a todo by id
app.get('/Customer/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await customerRepository.getCustomerById(id);
    console.log("get customer by id ", customer);
    res.json(customer);
  } catch (err) {
    console.log(err.message);
  }
});

//insert a todo
app.post('/Customer', async (req, res) => {
  try {
    const { Lname, Fname, DOB, pnumber, gender, email } = req.body;
    const newCustomer = await customerRepository.insertCustomer(Lname, Fname, DOB, pnumber, gender, email);
    console.log("insert customer ", newCustomer);
    res.json(newCustomer);
  } catch (err) {
    console.log(err.message);
  }
}); 

app.get('*', function (req, res) {
  path = __dirname + '/public/index.html';
  res.sendFile(path);
});

const dao = new AppDAO();
const customerRepository = new Repository(dao);
customerRepository.createCustomerTable();

app.listen(3000, () => {
  console.log('server has started on port 3000');
});