class Customer {
    constructor(id, Lname, Fname, DOB, pnumber, gender, email){
      this.id = id;
      this.Lname = Lname;
      this.Fname = Fname;
      this.DOB = DOB;
      this.pnumber = pnumber;
      this.gender = gender;
      this.email = email;
    }
  
    getId() {
      return this.id;
    }
  
    getLname() {
      return this.Lname;
    }

    getFname() {
        return this.Fname;
      }

    getDOB() {
      return this.DOB;
    }
    getGender() {
        return this.gender;
      }
    getPnumber() {
      return this.pnumber;
    }
    getEmail() {
        return this.email;
      }
  
    setId(id) {
      this.id = id;
    }
  
    setLname(Lname) {
      this.Lname = Lname;
    }
    setFname(Fname) {
        this.Fname = Fname;
      }
    setPnumber(pnumber) {
        this.pnumber = pnumber;
      } 
    setGender(gender) {
        this.gender = gender;
      }
    setEmail(email) {
        this.email = email;
      }
    setDOB(DOB) {
        this.DOB = DOB;
      } 

  }
  
  module.exports = Customer;