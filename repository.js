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
  insertPayment(accountID, custID, price){
    return this.dao.run(queries.insertPayment, [accountID, custID, price]);
  }
  insertReservation(customerID,seat_number, flightID, transactionID){
    const reserve_date = new Date().toISOString().split('T')[0];
    return this.dao.run(queries.insertReservation, [customerID,seat_number, flightID, transactionID, reserve_date]);
  }
  getTransactionId(accountID, custID){
    return this.dao.run(queries.getTransactionId, [accountID, custID])
  }
  createReserveTable() {
    const sql = queries.createReserveTable;
    return this.dao.run(sql);
  }
  createCreditCardTable() {
    const sql = queries.createCreditCardTable;
    return this.dao.run(sql);
  } 
  insertCreditCard(card_number, secure_number,expire_date,card_holder,card_type,accountID, custID){
    return this.dao.run(queries.insertCreditCard, [card_number, secure_number,expire_date,card_holder,card_type,accountID, custID]);
  }
  insertBankAccount(accountID, custID, bank_name, balance) {
    console.log(`Inserting the bankinfo`);
    return this.dao.run(queries.insertBankAccount, [accountID, custID, bank_name, balance]);
  }
  getAccount(custID){
    return this.dao.run(queries.getAccount, [custID]);
  }
  updateBankAccount(price, accountID, custID){
    return this.dao.run(queries.updateBankAccount, [price, accountID,custID]);
  }
  getBalance(accountID, custID){
    return this.dao.run(queries.getBalance, [accountID, custID])
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
    return this.dao.run(queries.updateSeatCount,[departmentID, flightID]);
  }
  getSeatPrice(flightID, departmentID){
    return this.dao.run(queries.getSeatPrice, [flightID, departmentID]);
  }
}

export default Repository;