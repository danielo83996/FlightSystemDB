// set global variable todos
let customers = [];

// function to set todos
const setCustomer = (data) => {
  customers = data;
};

// function to display todos
const displayCustomer = () => {
    customers.sort((a, b) => a.custID - b.custID);
    
    const customerTableBody = document.querySelector('#todo-table tbody');
    let tableHTML = '';
  
    customers.forEach((customer) => {
      tableHTML += `
        <tr>
          <td>${customer.Fname}</td>
        </tr>
      `;
    });
  
    customerTableBody.innerHTML = tableHTML;
  };
  

// select all the todos when the codes first run
console.log('start');
selectCustomer();
console.log('started');

// The following are async function to select, insert, update and delete todos
// select all the todos
async function selectCustomer() {
  // use try... catch... to catch error
  try {
    console.log('try to select');
    // GET all todos from "http://localhost:3000/todos"
    const response = await fetch('http://localhost:3000/Customer', {
      // const response = await fetch("/todos", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    // connect to heroku, remove localhost:port
    // const response = await fetch("/todos")
    const jsonData = await response.json();

    setCustomer(jsonData);
    displayCustomer();
  } catch (err) {
    console.log(err.message);
  }
}

async function insertCustomer() {
    const inputBox = document.querySelector('#Fname'); // Match the corrected HTML id
    const Fname = inputBox.value.trim(); // Trim whitespace
    const Lname = (document.querySelector('#Lname')).value.trim();
    const DOB = (document.querySelector('#dob')).value.trim();
    const pnumber = (document.querySelector('#pnumber')).value.trim();
    const gender = (document.querySelector('#gender')).value.trim();
    const email = (document.querySelector('#email')).value.trim();

    
    // Add 28 buttons dynamically
    const buttonsDiv = document.getElementById('seat-container');
    buttonsDiv.innerHTML = ''; // Clear previous buttons
    for (let i = 1; i <= 28; i++) {
        buttonsDiv.innerHTML += `<button class="seat-btn" id="seat-btn-${i}" type="button" onclick="buttonClicked(${i})">Seat ${i}</button>`;
    }

    // Clear form inputs after saving
    document.getElementById('customer-form').reset();


    console.log(Fname);
    if (!Fname||!DOB||!Lname||!pnumber||!gender||!email) {
      alert('All fields cannot be empty.');
      return;
    }

    
  
    try {
      const body = { Fname: Fname, Lname: Lname, DOB: DOB, pnumber: pnumber, gender: gender, email:email };

      const response = await fetch('http://localhost:3000/Customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
  
      // Refresh the customer list
      await selectCustomer();
      inputBox.value = ''; // Clear the input field
    } catch (err) {
      console.error('Error inserting customer:', err.message);
    }
  }

  async function buttonClicked(buttonId) { 
    window.location.href = `reservationPage.html?seatNumber=${buttonId}`;
  }
  