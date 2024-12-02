// Set global variables
let customers = [];
const params = new URLSearchParams(window.location.search);
const flightID = params.get('flightID');
const departmentID = params.get('departmentID'); 
let account=0;
console.log(flightID, departmentID);

// Function to set customers
const setCustomer = (data) => {
  customers = data;
}; 

// Function to insert a new customer
async function insertCustomer() {
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

    if (!response.ok) {
      throw new Error(`Failed to insert customer: ${response.statusText}`);
    }
 

    // Clear form inputs
    document.getElementById('customer-form').reset();
  } catch (err) {
    console.error('Error inserting customer:', err.message);
  }

  // Fetch and assign flight capacity to the 'capacity' variable
  try {
    console.log('Sending flightID and departmentID in the request body...');
    const response = await fetch('http://localhost:3000/flight-capacity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ flightID, departmentID }), // Send data in the request body
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch flight capacity: ${response.statusText}`);
    }

    // Log the full response to understand its structure
    const data = await response.json();
    console.log('Full response data:', data);  // Inspect the full response

    // Access the nested capacity value
    if (data && Array.isArray(data) && data[0] && Array.isArray(data[0].capacity) && data[0].capacity[0]) {
      const capacity = data[0].capacity[0].capacity; // Access the final capacity value
      console.log(`Capacity value: ${capacity}`);

      // Create seat buttons dynamically based on capacity
      try {
        // Get the container element
        const buttonsDiv = document.getElementById('seat-container');
        if (!buttonsDiv) {
          console.error('Seat container element not found!');
          return; // Stop execution if the container is missing
        }
      
        console.log('Seat container element:', buttonsDiv);
      
        // Clear existing buttons (if any)
        buttonsDiv.innerHTML = '';
      
        // Loop to create buttons dynamically
        for (let i = 1; i <= capacity; i++) {
          const buttonHTML = `
            <button 
              class="seat-btn" 
              id="seat-btn-${i}" 
              type="button" 
              onclick="buttonClicked(${i}, '${flightID}', '${departmentID}')">
              Seat ${i}
            </button>`;
          buttonsDiv.innerHTML += buttonHTML; // Append button to container
          console.log(`Button ${i} added.`); // Log each button creation
        }
      
        console.log('All buttons generated successfully.');
      } catch (err) {
        console.error('Error generating seat buttons:', err.message);
      }
      
    } else {
      alert('Could not fetch flight capacity.');
    }
  } catch (err) {
    console.error('Error fetching flight capacity:', err.message);
  }
}

// Function to handle button click 
async function buttonClicked(buttonId, flightID, departmentID) {
  try {
    // Fetch customer data
    const customerData = await getCustomerById(80); // Replace 80 with the actual customerId

    console.log('Full customer data:', customerData);

    // Validate the response
    if (!customerData || !Array.isArray(customerData) || customerData.length === 0) {
      console.error('No customer data found or response is empty.');
      alert('No customer data found!');
      return;
    }

    // Extract `custID` from the response
    const custID = customerData[0]?.custID; // Access the first object in the array
    if (!custID) {
      console.error('custID not found in the response:', customerData);
      alert('custID not found in the response!');
      return;
    }

    console.log('Extracted Customer ID:', custID);

    // Generate random data for the bank account
    const ranNum = Math.floor(Math.random() * 3) + 1; // Random number between 1 and 3
    const ranBalance = Math.floor(Math.random() * 100000) + 1; // Random balance

    let accountID, bank_name, balance;

    switch (ranNum) {
      case 1:
        accountID = 1;
        bank_name = 'Bank of America';
        balance = ranBalance;
        break;
      case 2:
        accountID = 2;
        bank_name = 'Chase';
        balance = ranBalance;
        break;
      default:
        accountID = 3;
        bank_name = 'Wells Fargo';
        balance = ranBalance;
    }

    // Create a bank account with the fetched custID
    account = accountID;
    const body = { accountID, custID, bank_name, balance };
    const response = await fetch('http://localhost:3000/bank-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to insert bank account: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Bank account inserted successfully:', data);
    window.location.href = `reservationPage.html?seatNumber=${buttonId}&flightID=${flightID}&departmentID=${departmentID}`;
  } catch (err) {
    console.error('Error in buttonClicked:', err.message);
  }
}



async function saveCreditCard() {
  const customerData = await getCustomerById(80); // Replace 80 with the actual customerId

  console.log('Full customer data:', customerData);

  // Validate the response
  if (!customerData || !Array.isArray(customerData) || customerData.length === 0) {
    console.error('No customer data found or response is empty.');
    alert('No customer data found!');
    return;
  }

  // Extract `custID` from the response
  const custID = customerData[0]?.custID; // Access the first object in the array
  if (!custID) {
    console.error('custID not found in the response:', customerData);
    alert('custID not found in the response!');
    return;
  }

  const card_holder = document.querySelector('#cardholderName').value.trim();
  const card_number = document.querySelector('#cardNumber').value.trim();
  const secure_number = document.querySelector('#cvv').value.trim();
  const expire_date = document.querySelector('#expiryDate').value.trim();
  const card_type = 'classic';  // Static card type
  
  if (!card_holder || !card_number || !secure_number || !expire_date || !card_type) {
    alert('All fields must be filled out.');
    return;
  }
  

  // Save credit card details
  response = await fetch('http://localhost:3000/credit-card', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ card_number, secure_number, expire_date, card_holder, card_type, custID }),
  });

  const result = await response.json();
  console.log('Credit card saved successfully:', result);
  document.getElementById('credit-card-form').reset();
}


async function getCustomerById(customerId) {
  try {
    const response = await fetch(`http://localhost:3000/customers/${customerId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch customer: ${response.statusText}`);
    }

    const customer = await response.json(); // Parse the response body

    console.log('Customer response:', customer);

    // Check the structure of the response to ensure it's an array
    if (Array.isArray(customer) && customer.length > 0) {
      return customer; // Return the customer data
    }

    console.error('Unexpected response format or no data:', customer);
    return null; // Return null if the response is empty or unexpected
  } catch (err) {
    console.error('Error fetching customer:', err.message);
    return null; // Return null in case of error
  }
}

async function getBankAccount(custID) {
  try {
    
    const response = await fetch(`http://localhost:3000/bank-account/${custID}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch bank account: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Bank account details:', data);
    return data; // Returns { accountID, custID }
  } catch (error) {
    console.error('Error fetching bank account:', error.message);
    return null;
  }
}




