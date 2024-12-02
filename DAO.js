import mysql from 'mysql2';
import Promise from 'bluebird';

class AppDAO {
  constructor() {
    // Set up the database connection
    this.connection = mysql.createConnection({
      host: '127.0.0.1', // Your database host
      user: 'root', // Your MySQL username
      password: 'Do34117x!', // Your MySQL password
      port: '3306', // Your MySQL port, normally "3306"
      database: 'test', // DO NOT EDIT (You need to create a "test" database from your "MySQL Workbench")
    });

    // Connect to the database
    this.connection.connect((err) => {
      if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
      }
      console.log('Connected to the MySQL database');
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, params, (err, results, fields) => {
        if (err) {
          console.error('Error executing query:', err.message);
          reject(err);
          return;
        }
        console.log('Query results:', results);
        resolve(results);
      });
    });
  }

  close() {
    // Close the connection when you're done
    this.connection.end((err) => {
      if (err) {
        console.error('Error closing the connection:', err.message);
        return;
      }
      console.log('Connection closed');
    });
  }
}

export default AppDAO;