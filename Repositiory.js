const queries = require('./queries');

class Repository {
  constructor(dao) {
    this.dao = dao;
  }

  createCustomerTable() {
    const sql = queries.createCustomerTable;
    return this.dao.run(sql);
  }

  insertCustomer(Lname, Fname, dob, pnumber, gender, email) {
    console.log('Inserting customer with values:', { Lname, Fname, dob, pnumber, gender, email });

    return this.dao.run(queries.insertCustomer, [Lname, Fname, dob, pnumber, gender, email]);
  } 
  getCustomerById(id) {
    return this.dao.run(queries.getCustomerById, [id]);
  }

  getAllCustomers() {
    return this.dao.run(queries.selectCustomer, []);
  }
}

module.exports = Repository;