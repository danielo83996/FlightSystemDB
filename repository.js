import queries from './queries.js';

class Repository {
  constructor(dao) {
    this.dao = dao;
  }

  createCustomerTable() {
    const sql = queries.createCustomerTable;
    return this.dao.run(sql);
  }
  createPaymentTable() {
    const sql = queries.createPaymentTable;
    return this.dao.run(sql);
  }
  createReserveTable() {
    const sql = queries.createReserveTable;
    return this.dao.run(sql);
  }
  createCreditCardTable() {
    const sql = queries.createCreditCardTable;
    return this.dao.run(sql);
  } 
  insertCreditCard(card_number, secure_number,expiere_date,card_holder,card_type,accountID, custID){
    return this.dao.run(queries.insertCreditCard, [card_number, secure_number,expiere_date,card_holder,card_type,accountID, custID])
  }
  insertBankAccount(accountID, custID, bank_name, balance) {
    console.log(`Inserting the bankinfo`);
    return this.dao.run(queries.insertBankAccount, [accountID, custID, bank_name, balance]);
  }
  getAccount(custID){
    return this.dao.run(queries.getAccount, [custID])
  }
  insertCustomer(Lname, Fname, dob, pnumber, gender, email) {
    console.log('Inserting customer with values:', { Lname, Fname, dob, pnumber, gender, email });

    return this.dao.run(queries.insertCustomer, [Lname, Fname, dob, pnumber, gender, email]);
  } 
  getCustomerById() {
    return this.dao.run(queries.getCustomerById, []);
  }

  getAllCustomers() {
    return this.dao.run(queries.selectCustomer, []);
  }
  getCapacity(departmentID, flightID) {
    return this.dao.run(queries.getCapacity, [departmentID, flightID]); 
}

  updateSeatCount(departmentID, flightID){
    return this.dao.run(queries.updateSeatCount,[departmentID, flightID])
  }
}

export default Repository;